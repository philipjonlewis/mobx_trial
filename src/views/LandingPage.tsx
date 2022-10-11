import React, { Component } from 'react';
import { ToDoStoreImplementation } from '../state/ToDoStore';
import { inject, observer } from 'mobx-react';

interface ToDoListProps {
  ToDoStore: ToDoStoreImplementation;
}

type MyState = { toDoList: string[]; inputValue: string };

class LandingPage extends Component<ToDoListProps, MyState> {
  constructor(props: ToDoListProps | Readonly<ToDoListProps>) {
    super(props);
    this.state = { inputValue: '', toDoList: ['hello'] };
  }

  render() {
    const { ToDoStore } = this.props;

    return (
      <div className="landing-page">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              this.setState({ inputValue: e.target.value });
            }}
            value={this.state.inputValue}
          />
          <button
            onClick={() => {
              ToDoStore.addTodo(this.state.inputValue);
              this.setState({
                inputValue: '',
              });
            }}
          >
            Submit
          </button>
        </form>

        <div>
          {ToDoStore.todos.length >= 1 &&
            ToDoStore.todos.map((todo) => {
              return (
                <div key={todo.id} className="todo-item">
                  <div onClick={() => ToDoStore.toggleTodo(todo.id)}>
                    {todo.completed ? <p>[ X ]</p> : <p>[...]</p>}
                  </div>
                  <p>{todo.title}</p>
                  <button
                    onClick={() => {
                      ToDoStore.deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default inject('ToDoStore')(observer(LandingPage));
