import { IsEnum, IsString, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
export class GetTaskFilterdto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
