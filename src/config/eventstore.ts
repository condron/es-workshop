export default {
  connectionSettings: {
    defaultUserCredentials: {
      username: process.env.ES_TCP_USERNAME,
      password: process.env.ES_TCP_PASSWORD,
    },
  },
  tcpEndpoint: {
    host: process.env.EVENT_STORE_TCP_HOST || 'event-store',
    port: process.env.EVENT_STORE_TCP_PORT || 1113,
  },
}
