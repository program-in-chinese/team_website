var 中英词典 = {
  "搜索": "search",
  "二分": "binary",
  "排序": "sort",
  "打乱": "shuffle",
  "流": "stream"
}

var 在线文档URL = 'https://devdocs.io/openjdk~8/';
var 搜索, 搜索结果, 所有数据 = [];

var 重新搜索 = function() {
  重建索引();
  进行搜索();
};

var 重建索引 = function() {
  搜索 = new JsSearch.Search('包');

  搜索.tokenizer = new JsSearch.StopWordsTokenizer(搜索.tokenizer);
  搜索.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  
  搜索.addIndex('类');
  搜索.addIndex('名');

  搜索.addDocuments(所有数据);
};

var 结果表格 = document.getElementById('结果表格');
var 表格内容 = 结果表格.tBodies[0];
var 搜索框 = document.getElementById('搜索框');
var 例程区 = document.getElementById("例程区");
var 例程框 = document.getElementById("中文例程");
var 例程 = CodeMirror.fromTextArea(例程框, {
  mode : "text/x-java",
  lineNumbers : true,
  matchBrackets : true
});

var 更新结果 = function(结果) {
  表格内容.innerHTML = '';

  var tokens = 搜索.tokenizer.tokenize(搜索框.value);

  for (var i = 0, length = 结果.length; i < length; i++) {
    var 某结果 = 结果[i];

    var 包列 = document.createElement('td');
    包列.innerText = 某结果.包;

    var 类列 = document.createElement('td');
    类列.innerHTML = 取类url(某结果);

    var 方法列 = document.createElement('td');
    方法列.innerHTML = 取方法url(某结果);

    var 行 = document.createElement('tr');
    行.appendChild(包列);
    行.appendChild(类列);
    行.appendChild(方法列);

    表格内容.appendChild(行);
  }

  if (结果.length == 1 && 结果[0].名 == "binarySearch") {

    例程区.style.display = 'block';
    例程.setValue(
    "import java.util.Arrays;\n" +
    "import java.util.Collections;\n" +
    "import java.util.List;\n" +
    
    "public class 二分查找空比较器 {\n" +
    "    public static void main (String args[]) throws Exception {\n" +
    "        List 列表 = Arrays.asList(new String[] {\"昨天\", \"今天\", \"明天\"});\n" +
    
    "        int 结果 = Collections.binarySearch(列表, \"明天\", null);\n" +
    "        if (结果 != 2)\n" +
    "            throw new Exception(\"Result: \" + 结果);\n" +
    "    }\n" +
    "}")
  } else {
    例程区.style.display = 'none';
  }
};

var 取类url = function(某结果) {
  return "<a href='" + 在线文档URL + 某结果.包.replace(/\./g, '/') + '/' +
    某结果.类.toLowerCase() + "'>" + 某结果.类 + "</a>";
}

// TODO: 方法位置由参数决定:
/* read(byte[] b,
int off,
int len)*/
// #read-byte:A-int-int-
var 取方法url = function(某结果) {
  return "<a href='" + 在线文档URL + 某结果.包.replace(/\./g, '/') + '/' +
    某结果.类.toLowerCase() + "#" + 某结果.名 + 某结果.网页位置 + "'>" + 某结果.名 + "</a>";
}

var 更新显示 = function() {

  if (搜索结果.length > 0) {
    更新结果(搜索结果);
  } else if (!!搜索框.value) {
    更新结果([]);
  } else {
    更新结果(所有数据);
  }
};

var 进行搜索 = function() {
  var 原始输入 = 搜索框.value;
  var 关键字 = 原始输入;
  if (中英词典[原始输入]) {
    关键字 = 中英词典[原始输入]
  }
  搜索结果 = 搜索.search(关键字);
  更新显示();
};

搜索框.oninput = 进行搜索;

var 隐藏元素 = function(element) {
  element.className += ' hidden';
};
var 显示元素 = function(element) {
  element.className = element.className.replace(/\s*hidden/, '');
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var json = JSON.parse(xmlhttp.responseText);

    所有数据 = json.API;

    var 数据载入进度 = document.getElementById('数据载入进度');
    隐藏元素(数据载入进度);
    显示元素(结果表格);

    重建索引();
    更新结果(所有数据);
  }
}
xmlhttp.open('GET', 'openjdk.json', true);
xmlhttp.send();