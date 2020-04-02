import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { TodoItemAddedEvent } from '../impl'

@EventsHandler(TodoItemAddedEvent)
export class TodoItemAddedHandler implements IEventHandler<TodoItemAddedEvent> {
  handle(event: TodoItemAddedEvent): any {
    Logger.log(event, 'TodoItemAddedHandler: ')
  }
}
