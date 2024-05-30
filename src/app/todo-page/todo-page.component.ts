import { Component } from '@angular/core';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoViewComponent} from "./todo-view/todo-view.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    TodoListComponent,
    TodoViewComponent,
    NgIf
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  selectedListId = 0;

  selectList(listId: number) {
    this.selectedListId = listId;
  }
}
