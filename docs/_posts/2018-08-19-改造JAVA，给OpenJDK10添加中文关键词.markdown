---
layout: post
comments: true
title:  改造JAVA，给OpenJDK10添加中文关键词
description: 修改Java编译器源码, 实现关键词的中文化. Modify source code of OpenJDK 10 to support keywords in Chinese.
date:   2018-08-19 00:00:00 -0700
categories: 语言设计 汉化关键词
---

OpenJDK10的编译参照 ： [在WSL上编译OpenJDK10](https://zhuanlan.zhihu.com/p/42410610)


魔改JAVA，添加中文关键词，改的不多，仅仅改了javac的源代码，分别属于java.compiler、jdk.compiler 两个模块

中文关键词，我用了自己的风格，不喜欢的话，可以自行修改。


jdk10\langtools\src\java.compiler\share\classes\javax\lang\model\SourceVersion.java

改最后一个函数，添加一些中文关键字的判断：
```java
public static boolean isKeyword(CharSequence s, SourceVersion version) {
        String id = s.toString();
        switch(id) {
            // A trip through history
        case "strictfp":
        case "严":
            return version.compareTo(RELEASE_2) >= 0;

        case "assert":
        case "断":
            return version.compareTo(RELEASE_4) >= 0;

        case "enum":
        case "举":
            return version.compareTo(RELEASE_5) >= 0;

        case "_":
            return version.compareTo(RELEASE_9) >= 0;

            // Keywords common across versions

            // Modifiers
        case "public":    case "protected": case "private":
        case "abstract":  case "static":    case "final":
        case "transient": case "volatile":  case "synchronized":
        case "native":
        case "公":    case "保": case "私":
        case "象":  case "固":    case "终":
        case "暂": case "易":  case "同":
        case "原":

            // Declarations
        case "class":     case "interface": case "extends":
        case "package":   case "throws":    case "implements":
        case "类":     case "接": case "承":
        case "包":   case "弃":    case "成":

            // Primitive types and void
        case "boolean":   case "byte":      case "char":
        case "short":     case "int":       case "long":
        case "float":     case "double":
        case "void":
        case "不二":   case "字":      case "符":
        case "短":     case "整":       case "长":
        case "浮":     case "双":
        case "空":

            // Control flow
        case "if":      case "else":
        case "try":     case "catch":    case "finally":
        case "do":      case "while":
        case "for":     case "continue":
        case "switch":  case "case":     case "default":
        case "break":   case "throw":    case "return":
        case "如":      case "另":
        case "试":     case "捕":    case "末":
        case "运":      case "当":
        case "为":     case "继":
        case "分":  case "例":     case "默":
        case "破":   case "抛":    case "返":

            // Other keywords
        case  "this":   case "new":      case "super":
        case "import":  case "instanceof":
        case  "此":   case "新":      case "超":
        case "进":  case "是":

            // Forbidden!
        case "goto":        case "const":
        case "去":        case "常":

            // literals
        case "null":         case "true":       case "false":
        case "无":         case "真":       case "假":
            return true;

        default:
            return false;
        }
```

jdk10\langtools\src\jdk.compiler\share\classes\com\sun\tools\javac\parser\Tokens.java

修改 Tokens 这个类
```java
public class Tokens {
   ...
    /** The names of all tokens.
     */
    //private Name[] tokenName = new Name[TokenKind.values().length];
    private Name[] tokenName = new Name[2 * TokenKind.values().length];
    // 添加了中文关键字，长度*2
   ...
/* 原代码
   protected Tokens(Context context) {
        context.put(tokensKey, this);
        names = Names.instance(context);
        for (TokenKind t : TokenKind.values()) {
            if (t.name != null)
                enterKeyword(t.name, t);
            else
                tokenName[t.ordinal()] = null;
        }

        key = new TokenKind[maxKey+1];
        for (int i = 0; i <= maxKey; i++) key[i] = TokenKind.IDENTIFIER;
        for (TokenKind t : TokenKind.values()) {
            if (t.name != null)
            key[tokenName[t.ordinal()].getIndex()] = t;
        }
    }

    private void enterKeyword(String s, TokenKind token) {
        Name n = names.fromString(s);
        tokenName[token.ordinal()] = n;
        if (n.getIndex() > maxKey) maxKey = n.getIndex();
    }
*/
    protected Tokens(Context context) {
        context.put(tokensKey, this);
        names = Names.instance(context);
        for (TokenKind t : TokenKind.values()) {
            if (t.name != null) {
                Name n = names.fromString(t.name);
                tokenName[2 * t.ordinal()] = n;
                if (n.getIndex() > maxKey) maxKey = n.getIndex();
                if (t.name_cn != null) {
                    Name n_cn = names.fromString(t.name_cn);
                    tokenName[2 * t.ordinal() + 1] = n_cn;
                    if (n_cn.getIndex() > maxKey) maxKey = n_cn.getIndex();
                }
                else {
                    tokenName[2 * t.ordinal() + 1] = null;
                }
            }
                //enterKeyword(t.name, t);
                //直接不用了，重新写了
            else {
                tokenName[2 * t.ordinal()] = null;
                tokenName[2 * t.ordinal() + 1] = null;
            }
        }

        key = new TokenKind[maxKey+1];
        for (int i = 0; i <= maxKey; i++) key[i] = TokenKind.IDENTIFIER;
        for (TokenKind t : TokenKind.values()) {
            if (t.name != null) {
                key[tokenName[2 * t.ordinal()].getIndex()] = t;
                if (t.name_cn != null) {
                    key[tokenName[2 * t.ordinal() + 1].getIndex()] = t;
                }
            }
        }
    }
}
   ...

    /**
     * This enum defines all tokens used by the javac scanner. A token is
     * optionally associated with a name.
     */
    //添加中文关键词表，在英文单词，后面加一个中文词
    // e.g. ABSTRACT("abstract"),  -->  ABSTRACT("abstract", "象"),
    //      ASSERT("assert", Tag.NAMED), -->  ASSERT("assert", "断", Tag.NAMED),
    // 具体实现可看结尾的构造函数，比较简单
    public enum TokenKind implements Formattable, Filter<TokenKind> {
        EOF(),
        ERROR(),
        IDENTIFIER(Tag.NAMED),
        ABSTRACT("abstract", "象"),
        ASSERT("assert", "断", Tag.NAMED),
        BOOLEAN("boolean", "不二", Tag.NAMED),
        BREAK("break", "破"),
        BYTE("byte", "字", Tag.NAMED),
        CASE("case", "例"),
        CATCH("catch", "捕"),
        CHAR("char", "符", Tag.NAMED),
        CLASS("class", "类"),
        CONST("const", "常"),
        CONTINUE("continue", "继"),
        DEFAULT("default", "默"),
        DO("do", "运"),
        DOUBLE("double", "双", Tag.NAMED),
        ELSE("else", "另"),
        ENUM("enum", "举", Tag.NAMED),
        EXTENDS("extends", "承"),
        FINAL("final", "终"),
        FINALLY("finally", "末"),
        FLOAT("float", "浮", Tag.NAMED),
        FOR("for", "为"),
        GOTO("goto", "去"),
        IF("if", "如"),
        IMPLEMENTS("implements", "成"),
        IMPORT("import", "进"),
        INSTANCEOF("instanceof", "是"),
        INT("int", "整", Tag.NAMED),
        INTERFACE("interface", "接"),
        LONG("long", "长", Tag.NAMED),
        NATIVE("native", "原"),
        NEW("new", "新"),
        PACKAGE("package", "包"),
        PRIVATE("private", "私"),
        PROTECTED("protected", "保"),
        PUBLIC("public", "公"),
        RETURN("return", "返"),
        SHORT("short", "短", Tag.NAMED),
        STATIC("static", "固"),
        STRICTFP("strictfp", "严"),
        SUPER("super", "超", Tag.NAMED),
        SWITCH("switch", "分"),
        SYNCHRONIZED("synchronized", "同"),
        THIS("this", "此", Tag.NAMED),
        THROW("throw", "抛"),
        THROWS("throws", "弃"),
        TRANSIENT("transient", "暂"),
        TRY("try", "试"),
        VOID("void", "空", Tag.NAMED),
        VOLATILE("volatile", "易"),
        WHILE("while", "当"),
        INTLITERAL(Tag.NUMERIC),
        LONGLITERAL(Tag.NUMERIC),
        FLOATLITERAL(Tag.NUMERIC),
        DOUBLELITERAL(Tag.NUMERIC),
        CHARLITERAL(Tag.NUMERIC),
        STRINGLITERAL(Tag.STRING),
        TRUE("true", "真", Tag.NAMED),
        FALSE("false", "假", Tag.NAMED),
        NULL("null", "无", Tag.NAMED),
        UNDERSCORE("_", Tag.NAMED),
        ARROW("->"),
        COLCOL("::"),
        LPAREN("("),
        RPAREN(")"),
        LBRACE("{"),
        RBRACE("}"),
        LBRACKET("["),
        RBRACKET("]"),
        SEMI(";"),
        COMMA(","),
        DOT("."),
        ELLIPSIS("..."),
        EQ("="),
        GT(">"),
        LT("<"),
        BANG("!"),
        TILDE("~"),
        QUES("?"),
        COLON(":"),
        EQEQ("=="),
        LTEQ("<="),
        GTEQ(">="),
        BANGEQ("!="),
        AMPAMP("&&"),
        BARBAR("||"),
        PLUSPLUS("++"),
        SUBSUB("--"),
        PLUS("+"),
        SUB("-"),
        STAR("*"),
        SLASH("/"),
        AMP("&"),
        BAR("|"),
        CARET("^"),
        PERCENT("%"),
        LTLT("<<"),
        GTGT(">>"),
        GTGTGT(">>>"),
        PLUSEQ("+="),
        SUBEQ("-="),
        STAREQ("*="),
        SLASHEQ("/="),
        AMPEQ("&="),
        BAREQ("|="),
        CARETEQ("^="),
        PERCENTEQ("%="),
        LTLTEQ("<<="),
        GTGTEQ(">>="),
        GTGTGTEQ(">>>="),
        MONKEYS_AT("@"),
        CUSTOM;

        public final String name;
        public final String name_cn; //添加的中文关键词的String
        public final Tag tag;
     
     //因为添加了一个中文关键字的String，初始化得简单修改 
        TokenKind() {
            //this(null, Tag.DEFAULT); //原代码
            this(null, null, Tag.DEFAULT); //新代码
        }

        TokenKind(String name) {
            //this(name, Tag.DEFAULT); //原代码
            this(name, null, Tag.DEFAULT); //新代码
        }

        TokenKind(Tag tag) {
            //this(null, tag); //原代码
            this(null, null, tag); //新代码
        }
        // 原有的构造函数，改为调用新的构造函数
        TokenKind(String name, Tag tag) {
            //this.name = name;
            //this.tag = tag;
            this(name, null, tag);
        }
        // 添加新的构造形式
        TokenKind(String name, String name_cn) {
            //this.name = name;
            //this.tag = tag;
            this(name, name_cn, Tag.DEFAULT);
        }
        // 新添加的构造函数
        TokenKind(String name, String name_cn, Tag tag) {
            this.name = name;
            this.name_cn = name_cn;
            this.tag = tag;
        }
```

以上两个源文件改好之后，保存为UTF-8格式。主要是我比较喜欢UTF-8格式，如果你想用GBK等其他格式，后面的参数，和中文源代码，都配套用相同格式就行。


加好代码后，编译参数也需要改一下，因为源代码里加了utf-8字符给 java.compiler、jdk.compiler 加上-encoding UTF-8 的选项。
```
jdk10/make/CompileJavaModules.gmk
line 88：
java.compiler_ADD_JAVAC_FLAGS += -encoding UTF-8 -Xdoclint:all/protected '-Xdoclint/package:java.*,javax.*'
line 354：
jdk.compiler_ADD_JAVAC_FLAGS += -encoding UTF-8 -Xdoclint:all/protected '-Xdoclint/package:-com.sun.tools.*,-jdk.internal.*' \
    -XDstringConcat=inline
```

编译完成之后，下面这段代码，可以顺利编译，打印。

OpenJDK10估计默认源代码为UTF-8，所以编译不需要加 -encoding UTF-8 参数。

包 hello;
```java
公 类 Hello {
	公 固 空 main(String[] args) {
		System.out.println("你好 SwizL!");
	}
}
```

OpenJDK10估计默认源代码为UTF-8，所以编译不需要加 -encoding UTF-8 参数。



参考:
- [狗屎咖啡：如何使GCC支持中文(utf-8)的变量名、函数名？​](https://zhuanlan.zhihu.com/p/31370146)
- [狗屎咖啡：为GCC添加中文关键字​](https://zhuanlan.zhihu.com/p/31376652)
- [狗屎咖啡：为Python添加中文关键字​](https://zhuanlan.zhihu.com/p/31159526)
- [狗屎咖啡：为clang添加中文关键字​](https://zhuanlan.zhihu.com/p/31158537)