---
layout: post
comments: true
title:  Python3选择支持非ASCII码标识符的缘由
description: 探究当年为何Python3选择添加对Unicode标识符的支持. Find out why Python 3 chose to add support for non-ASCII identifiers.
date:   2017-11-30 00:00:00 -0700
categories: 命名
---

原文在: [PEP 3131 -- Supporting Non-ASCII Identifiers](https://www.python.org/dev/peps/pep-3131/).

Rationale一节开篇明义, 指出***用母语命名标识符对代码清晰度和可维护性的提高***.

> Python code is written by many people in the world who are not
    familiar with the English language, or even well-acquainted with the
    Latin writing system. Such developers often desire to define classes
    and functions with names in their native languages, rather than having
    to come up with an (often incorrect) English translation of the
    concept they want to name. By using identifiers in their native
    language, code clarity and maintainability of the code among
    speakers of that language improves.

下面列出了一些质疑和回应. 其中:

> People claim that they will not be able to use a library if to do so they have
    to use characters they cannot type on their keyboards. However, it is the
    choice of the designer of the library to decide on various constraints for using
    the library: people may not be able to use the library because they cannot get
    physical access to the source code (because it is not published), or because
    licensing prohibits usage, or because the documentation is in a language they
    cannot understand. A developer wishing to make a library widely available needs
    to make a number of explicit choices (such as publication, licensing, language
    of documentation, and language of identifiers). It should always be the choice
    of the author to make these decisions - not the choice of the language
    designers.

简要翻译:

有人表示库如果是其他语言命名, 不懂这一语言的使用者就不会输入API名了. 回应是库开发者有权根据需要进行设计, 这与其他制约因素(版权,文档是外文等等)类似. 开发者如果想要库被最广泛地使用, 自然会考虑到所有这些因素. ***而这, 应该是开发者的决定, 而不是语言设计者的***.