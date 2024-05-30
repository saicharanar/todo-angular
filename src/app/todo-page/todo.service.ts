import {Subject} from "rxjs";
import * as _ from 'lodash';

export interface TodoItem {
  itemId: number;
  text: string;
  done: boolean;
}

export interface TodoList {
  listId: number;
  items: TodoItem[];
  title: string;
}

export class TodoService {
  private todos: TodoList[] = [];
  private todosSubject: Subject<TodoList[]> = new Subject<TodoList[]>();

  getTodoList(listId: number): undefined | TodoList {
    return this.todos.find((todo) => todo.listId === listId);
  }

  createTodoList(text: string) {
    const todo = {
      listId: this.todos.length ? this.todos[this.todos.length - 1].listId + 1 : 1,
      title: text,
      items: [],
    }
    this.todos.push(todo);
    this.todosSubject.next(this.todos);
  }

  createTodo(listId: number, itemText: string) {
    const items = this.getTodoList(listId)?.items;
    const nextItemId = items?.length ? items[items.length - 1].itemId + 1 : 1;
    items?.push({itemId: nextItemId, text: itemText, done: false});
    this.todosSubject.next(this.todos);
  }

  deleteTodoList(listId: number) {
    _.remove(this.todos, {listId: +listId});
    this.todosSubject.next(this.todos);
  }

  deleteTodo(listId: number, itemId: number) {
    _.remove(this.getTodoList(listId)?.items as TodoItem[], {itemId: +itemId});
    this.todosSubject.next(this.todos);
  }

  getAllTodosList() {
    return this.todosSubject.asObservable();
  }
}
