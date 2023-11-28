import { Channel, Connection, ConsumeMessage } from "amqplib";
import { Airline } from "../models/airline";
interface airline {
  inserted: {
    name: string,
    terms_and_conditions: string,
    id: string
  }
}


export class AirlineCreatedListener {
  private client: Connection;
  private channel!: Channel;
  private queueName = "AIRLINE:CREATED";
  constructor(client: Connection) {
    this.client = client;
  }

  async listen() {
    this.channel = await this.client.createChannel();
    await this.channel.assertQueue(this.queueName);
    this.channel.consume(this.queueName, (msg) => {


      const parsedData = JSON.parse(msg!.content.toString());

      this.onMessage(parsedData, msg!);
    });
  }
  async onMessage(data: airline, msg: any) {

    const airline = new Airline({
      name: data.inserted.name,
      _id: data.inserted.id,
      terms_and_conditions:data.inserted.terms_and_conditions

    });
    await airline.save();
    this.channel.ack(msg);
  }
}