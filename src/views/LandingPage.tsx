import React, { Component } from 'react';
import { ToDoStoreImplementation } from '../state/ToDoStore';
import { inject, observer } from 'mobx-react';
import { observable, autorun, action } from 'mobx';

interface ToDoListProps {
  ToDoStore: ToDoStoreImplementation;
}

type MyState = { toDoList: string[]; inputValue: string };

class LandingPage extends Component<ToDoListProps, MyState> {
  constructor(props: ToDoListProps | Readonly<ToDoListProps>) {
    super(props);
    this.state = { inputValue: '', toDoList: ['hello'] };
  }

  // const addToDo = () => {
  //   ToDoStore.addTodo(this.state.inputValue);
  //   this.setState({
  //     inputValue: '',
  //   });
  //   todos[0].completed = false;
  //   todos[2] = { title: 'Take a nap', completed: false };
  //   // todos.shift();
  // };

  name = 'philip';

  addToDo = (ToDoStore, todos) => {
    ToDoStore.addTodo(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
    todos[0].completed = false;
    todos[2] = { title: 'Take a nap', completed: false };
  };

  render() {
    const { ToDoStore } = this.props;
    const { name } = this;
    // ToDoStore.todos[0].title = editedStore[0].title;

    const todos = observable([
      { title: 'Spoil tea', completed: true },
      { title: 'Make coffee', completed: false },
    ]);

    autorun(() => {
      console.log(
        'Remaining:',
        todos
          .filter((todo) => !todo.completed)
          .map((todo) => todo.title)
          .join(', ')
      );
    });
    // Prints: 'Remaining: Make coffee'

    // todos[0].completed = false;
    // Prints: 'Remaining: Spoil tea, Make coffee'

    // todos[2] = { title: 'Take a nap', completed: false };
    // Prints: 'Remaining: Spoil tea, Make coffee, Take a nap'

    // todos.shift();

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
              onClick={action(() => this.addToDo(ToDoStore, todos))}
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
                        onClick={() => ToDoStore.toggleTodo(todo.id)}
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
