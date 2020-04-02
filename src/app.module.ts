import * as path from 'path'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventStoreCqrsModule } from 'nestjs-eventstore'
import { TodoModule } from './todo/todo.module'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { eventStoreBusConfig } from './event-bus.provider'

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    EventStoreCqrsModule.forRootAsync(
      {
        useFactory: async (config: ConfigService) => {
          return {
            connectionSettings: config.get('eventstore.connectionSettings'),
            endpoint: config.get('eventstore.tcpEndpoint'),
          }
        },
        inject: [ConfigService],
      },
      eventStoreBusConfig,
    ),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
