var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
  // this.afterdata = [];

  /* 判斷localStorage初始值不是空的情況下*/
  if(localStorage.data!= null){
    // arraytmp = localStorage.data.split(',');
    // this.data = arraytmp;
    this.data = JSON.parse(localStorage.data);
  }
  /* 處理 this.data 最後一個值為空的情況時(最後一個字為逗號) */
  // if(this.data[this.data.length-1] == ""){
  //   App.remove(this.data.length-1);
  // }
  App.xss();
  App.render();

  /* 判斷是否使用 ENTER鍵 作為ADD*/
  $('.mytxt').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      App.add(encodeURIComponent($(event.target).val()));
      $(event.target).val("");
    }
  });
  /* 使用delegate，使bind event變得較容易，不須考慮在哪一層*/
  $('.container').delegate('#addbtn','click',function(event){
      App.add($(event.target).prev().val());
      $(event.target).prev().val("");
  });

  $('.container').delegate('.editbtn','click',function(event){
    $(event.target).parent().parent().addClass('editing');
  });

  $('.container').delegate('.okbtn','click',function(event){
    App.update($('.okbtn').index(this), $(event.target).prev().val());
  });

  $('.container').delegate('.removebtn','click',function(event){
    App.remove($('.removebtn').index(this));
  });
};
//Add function to add list
App.add = function(str){
  this.data.push(str);
  App.xss();
  App.render();
  App.judge();
};
//remove
App.remove = function(index){
  this.data.splice(data.length-1-index, 1);
  App.xss();
  App.render();
  App.judge();
};
//update
App.update = function(index, value){
  /* data.length-1-index 因為App.render會相反輸出*/
  this.data.splice(data.length-1-index, 1, value);
  App.xss();
  App.render();
  App.judge();
};
//render
App.render = function(){
  data = this.data;
  console.log(this.data);
  html = "";
  var newtxt = '<span class="label label-danger pull-left">New</span>';
  for(var i=data.length-1; i>=0; i--){
    //add html string here
    html += '<li>'+
    '<div class="edit"><input value='+$('#todo-list').text(data[i]).html()+' class="mytxt"><button class="btn btn-default pull-right btn-sm okbtn">ok</button></div>' +
    '<div class="display"><span class="input-group-addon fontsize">'+$('#todo-list').text(data[i]).html()+'</span>'+ newtxt +'<button class="btn btn-primary pull-right btn-sm removebtn">remove</button><button class="btn btn-info pull-right btn-sm editbtn">edit</button></div><br/>' +
    '</li>';
    newtxt = "";
  }  
  $('ul').html(html);
};
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
//將data新增、修改、刪除的值記錄於localStorage
App.judge = function(){
  // localStorage.data = this.data+',';
  localStorage.data = JSON.stringify(this.data);
};
App.xss = function(){
  data = this.data;
  for(var i=data.length-1; i>=0; i--){
    data[i] = decodeURIComponent(data[i]);
  }
}
App.init();



