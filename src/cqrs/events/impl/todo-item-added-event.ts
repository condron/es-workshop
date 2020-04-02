import { IEvent } from '@nestjs/cqrs'
import { TodoItemData } from '../../../todo/event-dtos'
import { Logger } from '@nestjs/common'

export class TodoItemAddedEvent implements IEvent {
  constructor(
    public readonly _id: string,
    public readonly toDoItemAddeddDto: TodoItemData,
  ) {
    Logger.log(`TodoItemAdded Constructor: ${toDoItemAddeddDto} for id ${_id}`)
  }
}
