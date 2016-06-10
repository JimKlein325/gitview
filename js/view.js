  var apiKey = require('./../.env').apiKey;

  // exports.RepoItem = function RepoItem(name, description) {
  //   this.name = name;
  //   this.description = description;
  // };


  function RepoItem (name, description) {
    this.name = name;
    this.description = description;
  };

  RepoItem.prototype.writeHtml = function() {
    return "<h2>" + this.name + "</h2>" + "<p>" + this.description + "</p>";
  };

  exports.RepoList = function(){
  };

  exports.RepoList.prototype.getRepos = function(userName, displayFunction){
    //get data
    var uName = "JimKlein325o";

var items = [];

    // TODO:  GET json request and figure out how to get the json array.

    $.get('https://api.github.com/users/' + uName + '/repos?access_token=' + apiKey).then(function(response){

        var responseArray = response;
        //console.log(repoArray);

        for(var i = 0; i < responseArray.length ; i++) {
          var repo = responseArray[i];
          var name = repo.name;

          var repoItem = new RepoItem(repo.name, repo.description);
          items.push(repoItem);
          //debugger;
        }
        displayFunction(items, "success");
        //debugger;

    }).fail(function(error){
//alert("boo!");
    // console.log(error.responseJSON.message);
    var message = "Error: " + error.responseJSON.message + ". Please check that the user name is correct.";
    displayFunction(items, message);
  });

  };
