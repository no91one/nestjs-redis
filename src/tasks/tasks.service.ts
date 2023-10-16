import { UserRequest } from './../auth/user.request';
import { ExtractUserMiddleware } from '../auth/userExtract.middleware';
import { User } from './../auth/user.entity';
import { GetTaskFilterdto } from './dto/get-task.dto';
import { CreateTask } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    private readonly userExtract: ExtractUserMiddleware,
  ) {}
  createTask(newTask: CreateTask, user: User): Promise<Task> {
    return this.tasksRepository.createTask(newTask, user);
  }

  getTasks(taskDto: GetTaskFilterdto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(taskDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }
  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }
  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
