import { userContext } from './../auth/userContext.decorator';
import { User } from './../auth/user.entity';
import { updateTaskStatusdto } from './dto/updatetaskStatusdto';
import { GetTaskFilterdto } from './dto/get-task.dto';
import { CreateTask } from './dto/create-task.dto';
import { Task } from './task.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get('/testuser')
  // testUser() {
  //   return this.taskService.testUser();
  // }

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterdto,
    @userContext() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @userContext() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }
  @Post()
  createTask(
    @Body() newTask: CreateTask,
    @userContext() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(newTask, user);
  }
  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @userContext() user: User,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: updateTaskStatusdto,
    @userContext() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
