var apiKey = require('./../.env').apiKey;
var repository = require('./../js/repository.js').repositoryModule;

var displayRepos = function(repoItems, errorMessage) {
  if (errorMessage === "success") {
    for(var i = 0; i < repoItems.length ; i++) {
      var name = repoItems[i].name;
      var description = repoItems[i].description;
      var repoItem = repoItems[i];
      var displayText = "<h2>" + name + "</h2>" + "<p>" + description + "</p>";
      $('.repoContents').append(displayText);
    }
  }
  else {
    $('.repoContents').append("<p>" + errorMessage + "</p>");
  }
};

$(document).ready(function() {
  var repository = new Repository();
  $('#viewRepoContents').click(function() {
    var userName = $('#username').val();
    $('#username').val("");
    $('.repoContents').text("");
    repository.getRepos(userName, displayRepos);
  });
});
