var apiKey = require('./../.env').apiKey;

Repository = function() {
  this.name = "";
  this.description = "";
};

Repository.prototype.getRepos = function(userName, displayFunction){
  var repositoryItems = [];
  $.get('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey)
  .then(function(response){
    var responseArray = response;
    for(var i = 0; i < responseArray.length ; i++) {
      var repoItem = responseArray[i];
      var repository = new Repository();
      repository.name = repoItem.name;
      var description = repoItem.description;
      if(description === null){
        repository.description = "No description given.";
      }
      else if (description ==="") {
        repository.description = "No description given.";
      }
      else {
        repository.description = description;
      }
      repositoryItems.push(repository);
    }
    displayFunction(repositoryItems, "success");
  })
  .fail(function(error){
    var message = "Error: " + error.responseJSON.message + ". Please check that the user name is correct.";
    displayFunction(items, message);
  });
};

exports.repositoryModule = Repository;
