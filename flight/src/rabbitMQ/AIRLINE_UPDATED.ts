import { Channel, Connection, ConsumeMessage } from "amqplib";
import { Airline } from "../models/airline";
interface airline {
  changed: {
    name: string,
    terms_and_conditions: string,
    id: string
  
  }
}


export class AirlineUpdatedListener {
  private client: Connection;
  private channel!: Channel;
  private queueName = "AIRLINE:UPDATED";
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

    const name = data.changed.name;
    const terms_and_conditions = data.changed.terms_and_conditions;

    const changed = await Airline.findByIdAndUpdate(data.changed.id, { name, terms_and_conditions }, { new: true })

    this.channel.ack(msg);
  }
}