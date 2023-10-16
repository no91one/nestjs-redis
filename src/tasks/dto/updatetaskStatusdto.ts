import { TaskStatus } from '../task-status.enum';
import { IsEnum } from 'class-validator';
export class updateTaskStatusdto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
