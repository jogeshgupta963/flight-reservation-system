import { Channel, Connection, ConsumeMessage } from "amqplib";
import { Profile } from "../models/profile";
interface profile {
update: {
    ProfileId: string,
    Image: string,
    userId: string,
    phone_number: string,
    address: string,
    city: string,
    state: string,
    country: string,
    pincode: string
  }
}


export class ProfileUpdatedListener {
  private client: Connection;
  private channel!: Channel;
  private queueName = "PROFILE:UPDATED";
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
  async onMessage(data: profile, msg: any) {

    const newsaved = await Profile.findOneAndUpdate({ userId: data.update.userId},{
      Image:data.update.Image,
            phone_number: data.update.phone_number,
            address: data.update.address,
            city: data.update.city,
            country:data.update.country,
            pincode:data.update.pincode,
            state:data.update.state
    })
    this.channel.ack(msg);
  }
}