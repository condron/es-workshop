import { Controller, Post, Param, Body, Logger, Get } from '@nestjs/common'
import { TodoItemData } from './event-dtos'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<string[]> {
    Logger.log('/todo - findAll')
    return this.todoService.findAllTodoItems()
  }

  @Get(':id')
  findItems(@Param('id') id): Promise<string[]> {
    Logger.log('/todo/:id/')
    return this.todoService.findTodoItems(id)
  }

  @Post(':id')
  addItem(@Param('id') id, @Body() addItemDto: TodoItemData) {
    Logger.log(`addItem for todo list: ${id}`)
    this.todoService.addItem(addItemDto, id)
    return 'OK'
  }
}
