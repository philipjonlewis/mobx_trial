import {
  action,
  autorun,
  makeAutoObservable,
  makeObservable,
  observable,
} from 'mobx';

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

export class ToDoStoreImplementation {
  @observable
  todos: ToDoItem[] = [{ id: 1, title: 'hello', completed: false }];

  constructor() {
    // makeObservable(this, {
    //   todos: observable,
    //   addTodo: action,
    //   deleteTodo: action,
    //   toggleTodo: action,
    // });
    // makeAutoObservable(this);
    makeObservable(this);
    autorun(() => console.log(this.report));
  }

  get report() {
    return this.todos.length;
  }

  @action
  addTodo(title: string) {
    this.todos.push({
      id: +Math.random().toFixed(4),
      title,
      completed: false,
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
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

export const ToDoStore = new ToDoStoreImplementation();
