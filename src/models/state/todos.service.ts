import {ID} from "@datorama/akita";
import {Todo} from "./todo.model";
import { TodosStore, todosStore } from './todos.store';
const uuidv4 = require('uuid/v4');

export class TodosService {

  constructor(private todosStore: TodosStore) {
  }

  public addTodo(text: string): void {
    const todo: Todo = {id: uuidv4(), key: uuidv4(), text: text};
    this.todosStore.add(todo);
  }

  public removeTodo(id: ID): void {
    this.todosStore.remove(id);
  }
}

export const todosService = new TodosService(todosStore);
