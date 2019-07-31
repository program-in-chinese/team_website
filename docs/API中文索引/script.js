var 中英词典 = {
  "搜索": "search",
  "排序": "sort",
  "打乱": "shuffle",
  "流": "stream"
}

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
var indexedBooksTBody = 结果表格.tBodies[0];
var 搜索框 = document.getElementById('搜索框');

var 更新结果 = function(books) {
  indexedBooksTBody.innerHTML = '';

  var tokens = 搜索.tokenizer.tokenize(搜索框.value);

  for (var i = 0, length = books.length; i < length; i++) {
    var book = books[i];

    var 包列 = document.createElement('td');
    包列.innerText = book.包;

    var 类列 = document.createElement('td');
    类列.innerHTML = book.类;

    var 方法列 = document.createElement('td');
    方法列.innerHTML = book.名;

    var 行 = document.createElement('tr');
    行.appendChild(包列);
    行.appendChild(类列);
    行.appendChild(方法列);

    indexedBooksTBody.appendChild(行);
  }
};

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