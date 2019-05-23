import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Todo } from './todo.model';

export interface TodosState extends EntityState<Todo> {}

@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState, Todo> {

  constructor() {
    super();
  }
}

export const todosStore = new TodosStore();

