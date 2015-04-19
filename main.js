var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
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
  
  // $('li').append(data.length-1);
  $('ul').html(html);

  $('.editbtn').on("click",function(event){
    // console.log($(event.target).val());
    var status=$(event.target);
    var statuspre=$(event.target).prev();
    // console.log(statuspre.text());
    status.parent().parent().addClass('editing');
    status.css('display','none');
    status.next().css('display','none');

    $('.okbtn').on("click", function(event){
      // console.log($(event.target).prev().val());
      // console.log($('.editbtn').text());
      App.update(status.val(), $(event.target).prev().val());
      // console.log(data[i]);
    });
  });
  $('.removebtn').on("click",function(event){
    var status=$(event.target);
    var statuspre=$(event.target).prev();
    App.remove(status.val());
  });
};

$('#addbtn').on("click",function(){
    var status=$(event.target);
    var statuspre=$(event.target).prev();
    App.add(statuspre.val());
});


App.init();



