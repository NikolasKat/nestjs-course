import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, title: 'Learn Nest js', isCompleted: false },
    { id: 2, title: 'Build new server', isCompleted: true },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found!');
    }

    return task;
  }

  createNewTask(dto: CreateTaskDto) {
    const { tittle } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title: tittle,
      isCompleted: false,
    };

    this.tasks.push(newTask);

    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { isCompleted, tittle } = dto;

    const task = this.findById(id);

    task.title = tittle;
    task.isCompleted = isCompleted;

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  deleteTask(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return task;
  }
}
