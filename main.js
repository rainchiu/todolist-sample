var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
};


//Add function to add list
App.add = function(str){
  this.data.push(str);
};

//remove
App.remove = function(index){
  this.data.splice(index, 1);
};
//update
App.update = function(index, value){
  this.data.splice(index, 1, value);
};
//render
App.render = function(){
  data = this.data;
  html = "";
  for(var i=0; i<data.length; i++){
    //add html string here
  }
  $('ul').html(html);
};






App.init();


