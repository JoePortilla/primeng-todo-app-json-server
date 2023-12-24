import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "./model/todo";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getAllTodos() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  addTodo(postData: Todo) {
    return this.http.post(`${this.baseUrl}/todos`, postData);
  }

  updateTodo(postData: Todo) {
    return this.http.patch(`${this.baseUrl}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: Todo['id']) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }
}
