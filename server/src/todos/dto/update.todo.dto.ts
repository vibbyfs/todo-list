import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../entities/todos.entity';

export class UpdateTodoStatusDto {
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  problemDesc?: string;
}
