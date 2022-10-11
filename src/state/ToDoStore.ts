import { action, makeObservable, observable, decorate } from 'mobx';

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

export class ToDoStoreImplementation {
  todos: ToDoItem[] = [{ id: 1, title: 'hello', completed: false }];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      deleteTodo: action,
      toggleTodo: action,
    });
  }

  addTodo(title: string) {
    const item: ToDoItem = {
      id: +Math.random().toFixed(4),
      title,
      completed: false,
    };

    this.todos.push(item);
  }

  deleteTodo(id: number) {
    const newTodo = this.todos.filter((todo) => todo.id !== id);
    this.todos = newTodo;
  }

  toggleTodo(id: number) {
    const newList = this.todos.map((todo) => {
      if (todo.id == id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo;
    });

    this.todos = newList;
  }
}

// decorate(ToDoStoreImplementation, {
//   todos: observable,
//   addTodo: action,
// });

export const ToDoStore = new ToDoStoreImplementation();
