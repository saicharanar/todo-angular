import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  @Output()
  onCreate: EventEmitter<string> = new EventEmitter<string>();
  text: string | undefined;

  createItem(event: Event): void {
    this.onCreate.emit(this.text);
  }
}
