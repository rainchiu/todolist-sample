var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
  arraytmp = [];

  /* 判斷localStorage初始值不是空的情況下*/
  if(localStorage.getItem("data")!= null){
    arraytmp = localStorage.data.split(',');
    // console.log(arraytmp);
    this.data = arraytmp;
  }
  /* 處理 this.data 最後一個值為空的情況時(最後一個字為逗號) */
  if(this.data[this.data.length-1] == ""){
    App.remove(this.data.length-1);
  }
  App.render();

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
  App.judge();
};
//remove
App.remove = function(index){
  this.data.splice(index, 1);
  App.render();
  App.judge();
};
//update
App.update = function(index, value){
  this.data.splice(index, 1, value);
  App.render();
  App.judge();
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
//將data新增、修改、刪除的值記錄於localStorage
App.judge = function(){
  localStorage.data = this.data+',';
};

App.init();



