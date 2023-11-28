import { Channel, Connection, ConsumeMessage } from "amqplib";
import { Profile } from "../models/profile";
interface profile {
  findsome: {
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


export class ProfileCreatedListener {
  private client: Connection;
  private channel!: Channel;
  private queueName = "PROFILE:CREATED";
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

    const profile = new Profile({
            ProfileId:data.findsome.ProfileId,
            userId: data.findsome.userId ,
            Image:data.findsome.Image,
            phone_number: data.findsome.phone_number,
            address: data.findsome.address,
            city: data.findsome.city,
            country:data.findsome.country,
            pincode:data.findsome.pincode,
            state:data.findsome.state

    });
    await profile.save();
    this.channel.ack(msg);
  }
}