import { ID } from '@datorama/akita';

export interface Todo {
  id: ID;
  key: string,
  text: string;
}

export function createTodo(params: Partial<Todo>): Todo {
  return {

  } as Todo;
}
