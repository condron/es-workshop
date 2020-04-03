import { Logger } from '@nestjs/common'
import {
  EventStoreBusConfig,
  EventStoreSubscriptionType,
} from '@wisersolutions/nestjs-eventstore'

import { TodoItemData } from './todo/event-dtos'
import { TodoItemAddedEvent } from './cqrs'

export const eventStoreBusConfig: EventStoreBusConfig = {
  subscriptions: [
    {
      type: EventStoreSubscriptionType.CatchUp,
      stream: '$ce-todo',
      startFrom: 0,
    },
  ],
  eventInstantiators: {
    TodoItemAddedEvent: (
      _id: string,
      data: TodoItemData,
    ): TodoItemAddedEvent => {
      Logger.log('Received TodoItemAddedEvent')
      return new TodoItemAddedEvent(_id, data)
    },
  },
}
