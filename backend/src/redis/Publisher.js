class RedisPublisher {
  constructor(client) {
    this.client = client;
  }

  async publish(channel, payload) {
    await this.client.publish(channel, JSON.stringify(payload));
  }
}

export default RedisPublisher;
