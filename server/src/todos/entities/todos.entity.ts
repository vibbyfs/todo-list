import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
  CREATED = 'created',
  COMPLETED = 'completed',
  ON_GOING = 'on_going',
  PROBLEM = 'problem',
}

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.CREATED })
  status: TodoStatus;

  @Column({ type: 'text', nullable: true })
  problemDesc?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
