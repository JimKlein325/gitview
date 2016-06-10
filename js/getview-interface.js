var apiKey = require('./../.env').apiKey;

var RepoList = require('./../js/view.js').RepoList;

var RepoItem = require('./../js/view.js').RepoItem;

var displayRepos = function(repoItems, errorMessage) {

  if (errorMessage === "success") {
    for(var i = 0; i < repoItems.length ; i++) {
      var name = repoItems[i].name;
      var description = repoItems[i].description;
      var repoItem = repoItems[i];
      $('.repoContents').append(repoItem.writeHtml());
    };
  }
  else {
    $('.repoContents').append("<p>" + errorMessage + "</p>");
  }
};

$(document).ready(function() {
  $('#viewRepoContents').click(function() {
    var currentList = new RepoList();
    //currentWeatherObject.getWeather();
    var userName = $('#username').val();
    $('#username').val("");
    $('.repoContents').text("Test.");
    currentList.getRepos(userName, displayRepos);
  });
});
