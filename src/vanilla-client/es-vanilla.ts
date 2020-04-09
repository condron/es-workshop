import {
  createConnection,
  EventStoreNodeConnection,
  Position,
  UserCredentials,
} from 'node-eventstore-client'

const esProtocol = process.env.ES_TCP_PROTOCOL
const esHost = process.env.ES_TCP_HOSTNAME
const esPort = process.env.ES_TCP_PORT

function esBootstrap(): EventStoreNodeConnection {
  const esConnection: EventStoreNodeConnection = createConnection(
    {},
    `${esProtocol}://${esHost}:${esPort}`,
  )
  try {
    esConnection.connect()
    esConnection.once('connected', tcpEndPoint => {
      console.log(
        'Connected to eventstore at ' +
          tcpEndPoint.host +
          ':' +
          tcpEndPoint.port,
      )
    })
  } catch (err) {
    console.log(err)
  }
  return esConnection
}

class EsVanilla {
  constructor(public readonly connection: EventStoreNodeConnection) {}

  static formatEvent(event): string {
    return [
      event.originalEvent.eventType,
      [event.originalEventNumber.toNumber(), event.originalStreamId].join('@'),
      event.originalPosition,
    ].join(' ')
  }

  eventAppeared(subscription, event) {
    console.log('Event received', EsVanilla.formatEvent(event))
  }

  subscriptionDropped(subscription, reason, error) {
    console.log('Subscription dropped', reason, error)
  }

  liveProcessingStarted() {
    console.log('Live Processing Started')
  }

  start() {
    this.connection.subscribeToAllFrom(
      new Position(0, 0),
      true,
      this.eventAppeared,
      this.liveProcessingStarted,
      this.subscriptionDropped,
      new UserCredentials(
        process.env.ES_TCP_USERNAME,
        process.env.ES_TCP_PASSWORD,
      ),
    )
  }
}

const esVanilla = new EsVanilla(esBootstrap())
esVanilla.start()
