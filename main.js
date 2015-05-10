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
    localStorage.data = JSON.stringify(this.state.data);
    this.setState({data: this.state.data, text: ''});
  },
  removeTodo: function(index) {
    this.state.data.splice(index, 1);
    localStorage.data = JSON.stringify(this.state.data);
    this.setState({data: this.state.data});
  },
  updateTodo: function(index, value) {
    this.state.data.splice(index, 1, value);
    localStorage.data = JSON.stringify(this.state.data);
    this.setState({data: this.state.data});
    // console.log(this.state.data);
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
            isOnEditIdx:null,
            onEdit:[]
           };
    
  },
  onChange: function(index, e) {
    this.state.editdata.splice(index, 1, e.target.value);
    this.setState({editdata: this.state.editdata});
  },
  okHandler: function(index, value){
    // console.log('index',index);
    this.props.onClickOk(index, value);
    this.state.onEdit.splice(this.state.onEdit[index], 1);
    this.setState({onEdit:this.state.onEdit, isOnEditIdx:null});
    // console.log(this.state.onEdit);
  },
  editHandler: function(index){
    this.state.onEdit.push(index);
    this.setState({onEdit:this.state.onEdit, isOnEditIdx:index});
    // console.log(this.state.onEdit);
  },
  deletedata: function(index){
    this.props.onClickClose(index);
  },
  render: function() {
    var _self = this;
    var createItem = function(itemText, index) {  
      return (
        <li key={index} className={_self.state.onEdit.indexOf(index)>=0 ? "editing" : ""}>           
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