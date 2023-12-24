import {Component, ViewChild} from '@angular/core';
import {Todo} from "./model/todo";
import {JsonService} from "./json.service";
import {CheckboxChangeEvent} from "primeng/checkbox";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  task = '';
  todos: Todo[] = [];

  @ViewChild('todoTask') todoTask: any;

  constructor(private jsonService: JsonService) {
  }

  ngOnInit() {
    this.getTaskList()
  }

  getTaskList() {
    this.jsonService.getAllTodos().subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  addTodo() {
    // console.log('added:', this.task);
    this.jsonService.addTodo({
      task: this.task,
      completed: false
    }).subscribe(response => {
      // Debug
      console.log(response)
      // Clean the text box
      this.todoTask.reset();
      // Update the list
      this.getTaskList();
    })
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    // Debugging
    // console.log(e, todo)
    this.jsonService.updateTodo({
      ...todo,
      completed: e.checked
    }).subscribe(response => {
      console.log(response)
    })
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    // Debugging
    // console.log(e, id)
    this.jsonService.deleteTodo(id)
        .subscribe(response => {
          console.log(response)
          // Update the list
          this.getTaskList();
        })
  }


}
