import React from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';



class App extends React.Component {
  
  constructor(){
    super();

    this.state = {
      taskList: ['CodeWars: knock out some problems', 'Watch a tutorial', 'Double-check homework'],
      message: ''
    }
  }

  addTask(e){ //passing in the event itself.
    e.preventDefault(); //makes sure the page doesn't refresh when form is submitted.
    const {taskList} = this.state; //this will get taskList from the state.
    const newTask = this.newTask.value;

    const isOnTheList = taskList.includes(newTask);

    if(isOnTheList){

      this.setState({
        message: 'That task is already on the list.' 
      })

    } else {
      newTask !== '' && this.setState({ //If the newTask is not empty, then we will set it and add to state. If empty, it won't run.
        taskList: [...this.state.taskList, newTask], //... is the spread operator, spreads the previously stored tasks.
        message: ''
      })
    }

    this.addForm.reset();
  }

  completeTask(task){
    const newTask = this.state.taskList.filter(taskList => {
      return taskList !== task; 
    });

    this.setState({
      taskList: [...newTask],
      message: ''
    })

    if(newTask.length === 0){
      this.setState({
        message: 'There are no tasks on your list, get moving!'
      })

    }

  } 

  /*When calling completeTask(), if the values under the taskList property of state are not equal to 'task'
(what we're passing into the method), they are returned as we filter through the array. The 'task' we
enter is not kept on the filtered array. */

  clearAll(){
    this.setState({
      taskList: [],
      message: 'There are no tasks on your list, get moving!'
    });
     
  }

/* The form, label, and table tags below are using imported react-bootstrap styling. */

  render(){
    const {taskList, message} = this.state;
    return (
      <div>
        <header>
          <h1>To-Do List!</h1>

          <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addTask(e)}}>
            <div className="form-group">
              
              <input ref={input => this.newTask = input}type="text" placeholder="New Task" className="form-control" id="newTaskInput" />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </header>
        <div className="content">
          {
            (message !== '' || taskList.length ===0) && <p className="message text-danger">{message}</p>
          }
          {
          taskList.length > 0 &&
          <table className="table">
              <thead>
                <tr>
                <th></th>
                <th>Task</th>
              </tr>
            </thead>
            <tbody>
              {
                taskList.map(task => {
                  return (
                    <tr key={task}>
                      <th scope="row"><FontAwesome name='tasks' /></th>
                      <td>{task}</td>
                      <td className="text-right">
                        <button onClick={(e) => this.completeTask(task)} type="button" className="btn-default btn-sm">
                          Done!
                        </button>
                      </td>
                    </tr> 
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">&nbsp;</td>
                <td className="text-right">
                  <button onClick={(e) => this.clearAll()}className="btn-default btn-sm">Clear list</button>
                </td>
              </tr>
            </tfoot>
          </table>
          }
        </div>
      </div>
      )
    }
  }

export default App;