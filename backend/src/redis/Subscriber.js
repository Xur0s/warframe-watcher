class RedisSubscriber {
  constructor(client) {
    this.client = client;
  }

  async subscribe(channel, handler) {
    await this.client.subscribe(
      channel,
      // Get the data from redis subscribed channel and then pass that data into the handler
      async (message) => {
        const data = JSON.parse(message);
        await handler(data);
      },
    );
  }
}

export default RedisSubscriber;
