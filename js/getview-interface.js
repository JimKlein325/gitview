var apiKey = require('./../.env').apiKey;

var RepoList = require('./../js/view.js').RepoList;

var displayRepos = function(username) {
  $('.repoContents').text("Bingo: " + username +".");
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
