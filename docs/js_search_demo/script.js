var 搜索, 搜索结果, 所有数据 = [];

var 使能类索引 = document.getElementById('使能类索引');
var 索引策略选项 = document.getElementById('索引策略选项');
var removeStopWordsCheckbox = document.getElementById('removeStopWordsCheckbox');
var 使能方法索引 = document.getElementById('使能方法索引');
var useStemmingCheckbox = document.getElementById('useStemmingCheckbox');
var sanitizerSelect = document.getElementById('sanitizerSelect');
var tfIdfRankingCheckbox = document.getElementById('tfIdfRankingCheckbox');

var 重新搜索 = function() {
  重建索引();
  进行搜索();
};

使能类索引.onchange = 重新搜索;
索引策略选项.onchange = 重新搜索;
removeStopWordsCheckbox.onchange = 重新搜索;
使能方法索引.onchange = 重新搜索;
useStemmingCheckbox.onchange = 重新搜索;
sanitizerSelect.onchange = 重新搜索;
tfIdfRankingCheckbox.onchange = 重新搜索;

var 重建索引 = function() {
  搜索 = new JsSearch.Search('包');

  if (useStemmingCheckbox.checked) {
    搜索.tokenizer = new JsSearch.StemmingTokenizer(stemmer, 搜索.tokenizer);
  }
  if (removeStopWordsCheckbox.checked) {
    搜索.tokenizer = new JsSearch.StopWordsTokenizer(搜索.tokenizer);
  }

  搜索.indexStrategy =  eval('new ' + 索引策略选项.value + '()');
  搜索.sanitizer =  eval('new ' + sanitizerSelect.value + '()');;

  if (tfIdfRankingCheckbox.checked) {
    搜索.searchIndex = new JsSearch.TfIdfSearchIndex('包');
  } else {
    搜索.searchIndex = new JsSearch.UnorderedSearchIndex();
  }

  if (使能类索引.checked) {
    搜索.addIndex('类');
  }
  if (使能方法索引.checked) {
    搜索.addIndex('名');
  }

  搜索.addDocuments(所有数据);
};

var indexedBooksTable = document.getElementById('indexedBooksTable');
var indexedBooksTBody = indexedBooksTable.tBodies[0];
var 搜索框 = document.getElementById('搜索框');
var bookCountBadge = document.getElementById('bookCountBadge');

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
  搜索结果 = 搜索.search(搜索框.value);
  更新显示();
};

搜索框.oninput = 进行搜索;

var hideElement  = function(element) {
  element.className += ' hidden';
};
var showElement = function(element) {
  element.className = element.className.replace(/\s*hidden/, '');
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var json = JSON.parse(xmlhttp.responseText);

    所有数据 = json.API;

    var loadingProgressBar = document.getElementById('loadingProgressBar');
    hideElement(loadingProgressBar);
    showElement(indexedBooksTable);

    重建索引();
    更新结果(所有数据);
  }
}
xmlhttp.open('GET', 'openjdk.json', true);
xmlhttp.send();