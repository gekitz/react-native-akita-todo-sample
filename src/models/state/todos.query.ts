import { QueryEntity } from '@datorama/akita';
import { TodosStore, TodosState, todosStore } from './todos.store';
import { Todo } from './todo.model';

export class TodosQuery extends QueryEntity<TodosState, Todo> {
  public selectVisibleTodos$ = this.selectAll();

  constructor(protected store: TodosStore) {
    super(store);
  }
}

export const todosQuery = new TodosQuery(todosStore);
