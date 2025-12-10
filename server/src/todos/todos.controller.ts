import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todos.entity';
import { CreateTodoDto } from './dto/create.todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  findAll(@Query('search') search?: string): Promise<Todo[]> {
    return this.todoService.findAll(search);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }
}
