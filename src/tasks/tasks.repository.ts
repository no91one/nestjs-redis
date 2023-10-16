import { User } from './../auth/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterdto } from './dto/get-task.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async getTasks(taskDto: GetTaskFilterdto, user: User): Promise<Task[]> {
    const { status, search } = taskDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.description) LIKE LOWER(:search) OR LOWER(task.title) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(newTask: CreateTask, user: User): Promise<Task> {
    const { title, description } = newTask;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    try {
      const found = await this.findOne({ where: { id, user } });
      if (!found) {
        throw new NotFoundException(`Task with ${id} not found`);
      }
      return found;
    } catch (error) {
      return error.message;
    }
  }
}
