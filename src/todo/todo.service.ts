import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { EventBusProvider, EventStore } from '@wisersolutions/nestjs-eventstore'
import { TodoItemData } from './event-dtos'
import { TodoItemAddedEvent } from '../cqrs'

@Injectable()
export class TodoService {
  constructor(
    private readonly eventBus: EventBusProvider,
    private readonly eventStore: EventStore,
  ) {}

  async findAllTodoItems(
    start: number = 0,
    pageSize: number = 1000,
  ): Promise<string[]> {
    return this.findItems('$ce-todo', start, pageSize)
  }

  async findTodoItems(
    id: string,
    start: number = 0,
    pageSize: number = 1000,
  ): Promise<string[]> {
    return this.findItems(`todo-${id}`, start, pageSize)
  }

  async findItems(
    streamName: string,
    start: number,
    pageSize: number,
  ): Promise<string[]> {
    let result: string[]

    const eventSlice = await this.eventStore.connection.readStreamEventsForward(
      streamName,
      start,
      pageSize,
      true,
    )

    result = eventSlice.events.map((v, i, a) => {
      const data: TodoItemAddedEvent = JSON.parse(
        v.event.data.toString(),
      ) as TodoItemAddedEvent
      return data.toDoItemAddeddDto.value
    })
    return result
  }

  async addItem(addItemDto: TodoItemData, stream: string): Promise<string> {
    Logger.log(this.eventStore.isConnected, ' Is Connected?')
    this.eventBus.publish(
      new TodoItemAddedEvent(stream, addItemDto),
      `todo-${stream}`,
    )
    return 'OK'
  }
}
