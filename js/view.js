  var apiKey = require('./../.env').apiKey;
  function RepoItem (name, description) {
    this.name = name;
    if(description === null){
      this.description = "No description given.";
    }
    else if (description ==="") {
      this.description = "No description given.";
    }
    else {
      this.description = description;
    }
  };
  RepoItem.prototype.writeHtml = function() {
    return "<h2>" + this.name + "</h2>" + "<p>" + this.description + "</p>";
  };

  exports.RepoList = function(){
  };
  exports.RepoList.prototype.getRepos = function(userName, displayFunction){
    var items = [];
    $.get('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey)
    .then(function(response){
        var responseArray = response;
        for(var i = 0; i < responseArray.length ; i++) {
          var repo = responseArray[i];
          var name = repo.name;
          var repoItem = new RepoItem(repo.name, repo.description);
          items.push(repoItem);
        }
        displayFunction(items, "success");
    })
    .fail(function(error){
    var message = "Error: " + error.responseJSON.message + ". Please check that the user name is correct.";
    displayFunction(items, message);
  });

  };
