import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo, TodoStatus } from './entities/todos.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create.todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(search?: string): Promise<Todo[]> {
    const where = search
      ? ({ title: ILike(`%${search}%`) } as FindOptionsWhere<Todo>)
      : undefined;

    return this.todoRepository.find({
      where,
      order: { id: 'ASC' },
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      title: createTodoDto.title,
      status: TodoStatus.CREATED,
    });

    return this.todoRepository.save(todo);
  }
}
