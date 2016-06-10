var apiKey = require('./../.env').apiKey;

var repoItem = function RepoItem(name, description) {
  this.name = name;
  this.description = description;
};

exports.RepoList = function(){

};

exports.RepoList.prototype.getRepos = function(userName, displayFunction){
  //get data
  var uName = "JimKlein325";



  // TODO:  GET json request and figure out how to get the json array.

  $.get('https://api.github.com/users/' + uName + '/repos?access_token=' + apiKey).then(function(response){
      displayFunction(uName);
      console.log(JSON.stringify(response));
  }).fail(function(error){
  console.log(error.responseJSON.message);
});

};
