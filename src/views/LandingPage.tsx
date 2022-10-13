import React, { Component } from 'react';
import { ToDoStoreImplementation } from '../state/ToDoStore';
import { inject, observer } from 'mobx-react';
import { observable, autorun, action, reaction } from 'mobx';

interface ToDoListProps {
  ToDoStore: ToDoStoreImplementation;
}

type MyState = { toDoList: string[]; inputValue: string };

class LandingPage extends Component<ToDoListProps, MyState> {
  constructor(props: ToDoListProps | Readonly<ToDoListProps>) {
    super(props);
    this.state = { inputValue: '', toDoList: ['hello'] };
  }
  name = 'philip';

  render() {
    const { ToDoStore } = this.props;
    const { name } = this;

    // autorun(() => {
    //   console.log(ToDoStore.report);
    // });

    reaction(
      () => ToDoStore.report,
      (len) => {
        console.log(len);
      }
    );

    return (
      <div className="container mx-auto flex justify-center items-center p-8">
        <div className="">
          <form
            className="flex gap-1  w-96 mb-8"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              required
              className="text-gray-700 h-8 rounded-sm p-2 outline-none w-2/3"
              type="text"
              onChange={(e) => {
                this.setState({ inputValue: e.target.value });
              }}
              value={this.state.inputValue}
            />
            <button
              className="bg-blue-600 h-8 rounded-sm w-1/3"
              onClick={action(() => {
                ToDoStore.addTodo(this.state.inputValue);
                this.setState({ inputValue: '' });
              })}
            >
              Add Todo
            </button>
          </form>

          <div className="mb-2">
            <p className="text-xl font-bold">To Do List</p>
          </div>

          <p>{name}</p>

          <div className="flex flex-col gap-1">
            {ToDoStore.todos.length >= 1 &&
              ToDoStore.todos.map((todo) => {
                return (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center gap-4 bg-gray-700 h-12 rounded-md px-2"
                  >
                    <div className="flex gap-2">
                      <div
                        onClick={action(() => ToDoStore.toggleTodo(todo.id))}
                        className="cursor-pointer w-8"
                      >
                        {todo.completed ? <p>[ X ]</p> : <p>[....]</p>}
                      </div>
                      <p>{todo.title}</p>
                    </div>

                    <button
                      className="bg-red-500 py-2 px-4 rounded-md text-xs font-semibold hover:bg-red-600"
                      onClick={action(() => {
                        ToDoStore.deleteTodo(todo.id);
                      })}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ToDoStore')(observer(LandingPage));
