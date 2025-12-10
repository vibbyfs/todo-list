import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todos.entity';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoStatusDto } from './dto/update.todo.dto';

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

  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTodoStatusDto,
  ): Promise<Todo> {
    return this.todoService.updateStatus(id, updateDto);
  }
}
