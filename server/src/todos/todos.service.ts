import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo, TodoStatus } from './entities/todos.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoStatusDto } from './dto/update.todo.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly aiService: AiService,
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

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      title: createTodoDto.title,
      status: TodoStatus.CREATED,
    });

    return this.todoRepository.save(todo);
  }

  async updateStatus(
    id: number,
    updateDto: UpdateTodoStatusDto,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    todo.status = updateDto.status;

    if (updateDto.status === TodoStatus.PROBLEM) {
      todo.problemDesc =
        updateDto.problemDesc !== undefined
          ? updateDto.problemDesc
          : (todo.problemDesc ?? null);
    } else {
      todo.problemDesc = null;
    }

    return this.todoRepository.save(todo);
  }

  async getDetailRecomendation(
    id: number,
  ): Promise<Todo & { aiRecomendation: string | null }> {
    const todo = await this.findOne(id);

    let aiRecomendation: string | null = null;

    if (todo.status === TodoStatus.PROBLEM && todo.problemDesc) {
      aiRecomendation = await this.aiService.recomendProblemDesc(
        todo.problemDesc,
      );
    }

    return {
      ...todo,
      aiRecomendation: aiRecomendation,
    };
  }
}
