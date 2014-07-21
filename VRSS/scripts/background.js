function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}
function FeedListAdd (result)
{
        var data = JSON.parse(result);
        var title = data.responseData.feed.title;
        var list = FeedListGet();
        var id = localStorage.getItem('FeedListId') ? localStorage.getItem('FeedListId') : 1;
        list.push({
            url:    rssUrl,
            title:  title,
            id:     id
        });
        LocalObjectStorage.setObject('FeedList', list);
        localStorage.setItem('FeedListId', ++id);
}
function FeedListGet () {
        if (LocalObjectStorage.contains('FeedList')) {
            return LocalObjectStorage.getObject('FeedList');
        }
        return new Array({
            url: 'http://youbookee.com/feed.xml',
            title: 'Youbookee',
            id: 0
        });
}
LocalObjectStorage = new Object();
LocalObjectStorage.getObject = function (key) { return JSON.parse(localStorage.getItem(key)); };
LocalObjectStorage.setObject = function (key, value) { localStorage.setItem(key, JSON.stringify(value));};
LocalObjectStorage.contains = function (key) { return localStorage.getItem(key) ? true : false;};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message == 'Add') {
        chrome.tabs.getSelected(null,function(tab){
            rssUrl = tab.url;
            searchUrl = 'http://ajax.googleapis.com/ajax/services/feed/lookup?callback?&q=' + tab.url + '&v=1.0';
            httpRequest(searchUrl,addFeed);
        });
    }
});
function addFeed(result) {
    var data = JSON.parse(result);
    rssUrl = data.responseData.url;
    Url = 'http://ajax.googleapis.com/ajax/services/feed/load?callback?&num=1&q='+ rssUrl + '&v=1.0';
    httpRequest(Url,FeedListAdd);
}
