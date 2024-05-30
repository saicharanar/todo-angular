import {Component, inject, Input, OnInit} from '@angular/core';
import {CreateTodoComponent} from "../create-todo/create-todo.component";
import {TodoItem, TodoList, TodoService} from "../todo.service";
import {Subject, takeUntil} from "rxjs";
import {TODD_SERVICE_TOKEN} from "../../app.config";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-todo-view',
  standalone: true,
  imports: [
    CreateTodoComponent,
    NgForOf
  ],
  templateUrl: './todo-view.component.html',
  styleUrl: './todo-view.component.css'
})
export class TodoViewComponent implements OnInit {
  @Input() selectedListId: number | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  private todoService: TodoService = inject(TODD_SERVICE_TOKEN);
  items: undefined | Array<TodoItem> = [];

  ngOnInit(): void {
    this.todoService.getAllTodosList().pipe(takeUntil(this.destroy$))
      .subscribe((todos: TodoList[]) => {
        this.items = this.todoService.getTodoList(this.selectedListId as number)?.items
      })
  }

  deleteItem(itemId: number) {
    this.todoService.deleteTodo(this.selectedListId as number, itemId);
  }

  createItem(text: string) {
    this.todoService.createTodo(this.selectedListId as number, text);
  }
}
