import { Serializable } from './serializable';

export class Todo extends Serializable {
  userId: number;
  title: string;
  id: number;
  completed: boolean = false;
}
