var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
  /* 使用delegate，使bind event變得較容易，不須考慮在哪一層*/
  $('.container').delegate('#addbtn','click',function(){
      App.add($(event.target).prev().val());
      $(event.target).prev().val("");
  });

  $('.container').delegate('.editbtn','click',function(event){
    $(event.target).parent().parent().addClass('editing');
  });

  $('.container').delegate('.okbtn','click',function(event){
    App.update($(event.target).val(), $(event.target).prev().val());
  });

  $('.container').delegate('.removebtn','click',function(event){
    App.remove($(event.target).val());
  });
};
//Add function to add list
App.add = function(str){
  this.data.push(str);
  App.render();
};
//remove
App.remove = function(index){
  this.data.splice(index, 1);
  App.render();
};
//update
App.update = function(index, value){
  this.data.splice(index, 1, value);
  App.render();
};
//render
App.render = function(){
  data = this.data;
  html = "";
  for(var i=0; i<data.length; i++){
    //add html string here
     html += '<li>'+
   '<div class="edit"><input value='+data[i]+'><button class="okbtn" value="'+i+'">ok</button></div>' +
   '<div class="display"><span>'+data[i]+'</span><button class="editbtn" value="'+i+'">edit</button><button class="removebtn" value="'+i+'">remove</button></div>' +
   '</li>';
  }  
  $('ul').html(html);
/* bind event */
  // $('.editbtn').on("click",function(event){
  //   $(event.target).parent().parent().addClass('editing');
  //   $('.okbtn').on("click", function(event){
  //     App.update($(event.target).val(), $(event.target).prev().val());
  //   });
  // });
  // $('.removebtn').on("click",function(event){
  //   App.remove($(event.target).val());
  // });
};

App.init();



