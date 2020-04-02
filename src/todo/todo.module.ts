import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { TodoItemAddedHandler } from '../cqrs'
@Module({
  imports: [],
  providers: [TodoService, TodoItemAddedHandler],
  controllers: [TodoController],
})
export class TodoModule {}
