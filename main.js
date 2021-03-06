var myDataRef;
var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {data: [], tmptext: '', key: [], idx: ''};
  },
  componentWillMount: function(){
    myDataRef = new Firebase('https://rainchiu.firebaseio.com/');
    var _self = this;
     myDataRef.on('child_added', function(snapshot) {
      _self.state.key.push(snapshot.key());
      _self.state.data.push(snapshot.val().text);
      _self.setState({data: _self.state.data,tmptext: ''});   
      // console.log(_self.state.data);
    });
  },
  componentDidMount: function(){
    var _self = this;
    myDataRef.on('child_changed', function(snapshot) {
      // console.log(_self.state.key);
      for(var i=0;i<_self.state.key.length;i++){
        if(_self.state.key[i]==snapshot.key()){
          _self.state.idx = i;
        }
      }
      _self.state.data.splice(_self.state.idx, 1 , snapshot.val().text);
      _self.setState({data: _self.state.data, idx:''});
      // console.log('sss');
    });
    myDataRef.on('child_removed', function(snapshot) {
      // console.log(_self.state.idx);
      for(var i=0;i<_self.state.key.length;i++){
        if(_self.state.key[i]==snapshot.key()){
          _self.state.idx = i;
        }
      }
      _self.state.key.splice(_self.state.idx, 1);
      _self.state.data.splice(_self.state.idx, 1);
      _self.setState({data: _self.state.data});
    });
  },
  componentWillUpdate: function(){
  },
  componentWillUnmount: function(){
    myDataRef.off();
  },
  onChange: function(e) {
    this.setState({tmptext: e.target.value});
  },
  addTodo: function(e) {
    // this.state.data.push(this.state.tmptext);
    // this.setState({data: this.state.data, tmptext: ''});
    e.preventDefault();
    myDataRef.push({text: this.state.tmptext});
  },
  removeTodo: function(index) {
    // this.state.data.splice(index, 1);
    // this.setState({data: this.state.data}); 
    this.state.idx = index;
    myDataRef.child(this.state.key[index]).remove();
  },
  updateTodo: function(index, value) {
    // this.state.data.splice(index, 1, value);
    // this.setState({data: this.state.data});
    // this.state.idx = index;
    // console.log(this.state.idx);
    this.state.idx = index;
    myDataRef.child(this.state.key[index]).update({text: value});
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input className="myTxt" onChange={this.onChange} value={this.state.tmptext} />
          <button className="btn btn-default btn-sm pull-right">ADD</button>
        </form>
        <TodoList data={this.state.data} onClickOk={this.updateTodo} onClickClose={this.removeTodo}/>
      </div>
    );
  }
});
var TodoList = React.createClass({
  getInitialState: function() {
    return {
            editdata: this.props.data,
            onEdit:[]
           };  
  },
  onChange: function(e) {
    this.state.editdata.splice(e.target.getAttribute('data-index'), 1, e.target.value);
    this.setState({editdata: this.state.editdata});
  },
  okHandler: function(e){
    this.props.onClickOk(e.target.getAttribute('data-index'), e.target.value);
    // this.state.onEdit.splice(this.state.onEdit[index], 1);
    for(i = 0; i< this.state.onEdit.length ; i++){
      if(this.state.onEdit[i]==e.target.getAttribute('data-index')){
         this.state.onEdit.splice(i, 1);
      } 
    }
    this.setState({onEdit:this.state.onEdit});
    // console.log(this.state.onEdit);
  },
  editHandler: function(e){
    this.state.onEdit.push(parseInt(e.target.getAttribute('data-index')));
    this.setState({onEdit:this.state.onEdit});
    // console.log(this.state.onEdit);
  },
  deletedata: function(e){
    this.props.onClickClose(e.target.getAttribute('data-index'));
    for(i = 0; i< this.state.onEdit.length ; i++){
      if(this.state.onEdit[i]>=e.target.getAttribute('data-index')){
         this.state.onEdit[i]-=1;
      } 
    }
    this.setState({editdata:this.props.data});
    // console.log(this.state.onEdit);
  },
  render: function() {
    var _self = this;
    var createItem = function(itemText, index) {  
      return (
        <li key={index} className={_self.state.onEdit.indexOf(index)>=0 ? "editing" : ""}>           
          <div className="edit">
            <input className="mytxt" onChange={_self.onChange} data-index={index} value={_self.state.editdata[index]} />
            <button className="btn btn-default pull-right btn-sm okbtn" onClick={_self.okHandler} data-index={index} value={_self.state.editdata[index]} >ok</button>
          </div>
          <div className="display">
            <span className="input-group-addon fontsize">{itemText}</span>
            <button className="btn btn-primary pull-right btn-sm removebtn" onClick={_self.deletedata} data-index={index}>remove</button>
            <button className="btn btn-info pull-right btn-sm editbtn" onClick={_self.editHandler} data-index={index}>edit</button>
          </div>  
        </li>       
      );
    };
    return <ul>{this.props.data.map(createItem)}</ul>;
  }
});
React.render(<App />, content);