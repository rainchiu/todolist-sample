var App = React.createClass({
  getInitialState: function() {
    return {data: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  addTodo: function(e) {
    e.preventDefault();
    this.state.data.push(this.state.text);
    this.setState({data: this.state.data, text: ''});
  },
  removeTodo: function(index) {
    this.state.data.splice(index, 1);
    this.setState({data: this.state.data});
  },
  updateTodo: function(index, value) {
    this.state.data.splice(index, 1, value);
    this.setState({data: this.state.data});
    console.log(this.state.data);
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input className="myTxt" onChange={this.onChange} value={this.state.text} />
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
            isOnEditIdx:null
           };
  },
  onChange: function(index, e) {
    this.state.editdata.splice(index, 1, e.target.value);
    this.setState({editdata: this.state.editdata});
  },
  // changeMode: function(index, modejudge, value){
  //   if(modejudge=='1'){
  //     this.setState({mode: 'editing'});  
  //   }
  //   else{
  //     this.props.onClickOk(index, value);
  //     this.setState({mode: '', editdata: this.state.editdata}); 
  //     console.log(this.state.editdata);
  //   }
  // },
  okHandler: function(index, value){
    // console.log('index',index);
    this.props.onClickOk(index, value);
    this.setState({isOnEditIdx: null});
  },
  editHandler: function(index){
    // console.log('index',index);
    this.setState({isOnEditIdx:index});
  },
  deletedata: function(index){
    this.props.onClickClose(index);
  },
  render: function() {
    var _self = this;
    var createItem = function(itemText, index) {  
      return (
        <li key={index} className={_self.state.isOnEditIdx == index ? "editing" : ""}>           
          <div className="edit">
            <input className="mytxt" onChange={_self.onChange.bind(this, index)} value={_self.state.editdata[index]} />
            <button className="btn btn-default pull-right btn-sm okbtn" onClick={_self.okHandler.bind(this, index, _self.state.editdata[index])}>ok</button>
          </div>
          <div className="display">
            <span className="input-group-addon fontsize">{itemText}</span>
            <button className="btn btn-primary pull-right btn-sm removebtn" onClick={_self.deletedata.bind(this, index)}>remove</button><button className="btn btn-info pull-right btn-sm editbtn" onClick={_self.editHandler.bind(this, index)}>edit</button>
          </div>  
        </li>       
      );
    };
    return <ul>{this.props.data.map(createItem)}</ul>;
  }
});
React.render(<App />, content);