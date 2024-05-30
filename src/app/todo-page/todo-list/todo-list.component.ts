import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {TodoList, TodoService} from "../todo.service";
import {TODD_SERVICE_TOKEN} from "../../app.config";
import {Subject, takeUntil} from "rxjs";
import {NgForOf} from "@angular/common";
import {CreateTodoComponent} from "../create-todo/create-todo.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NgForOf,
    CreateTodoComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  @Output()
  onListSelect: EventEmitter<number> = new EventEmitter<number>();

  private destroy$: Subject<void> = new Subject<void>();
  private todoService: TodoService = inject(TODD_SERVICE_TOKEN);
  todos: TodoList[] = [];


  ngOnInit() {
    this.todoService.getAllTodosList().pipe(takeUntil(this.destroy$))
      .subscribe((todos: TodoList[]) => {
        console.log(todos);
        this.todos = todos;
      })
  }

  createTodoList(text: string) {
    this.todoService.createTodoList(text);
  }

  deleteTodo(listId: number): void {
    this.todoService.deleteTodoList(listId);
  }

  viewList(listId: number) {
    this.onListSelect.emit(listId);
  }
}
