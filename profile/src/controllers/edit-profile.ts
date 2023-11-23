import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {z} from 'zod'
import { Request ,Response} from 'express';
import { UserPayload } from '../middlewares/auth';
import * as amqp from 'amqplib';
export async function editprofile(req: Request, res: Response) {
    let channel
         const connection = await amqp.connect("amqps://rmgykywi:FAXeDfV9FCux1vkhRqyr2cj4TLtAYOcI@puffin.rmq2.cloudamqp.com/rmgykywi");
         channel = await connection.createChannel();
         await channel.assertQueue("PROFILE:UPDATED");
    const profiledata = req.body;
    const userid =req.user as UserPayload;
    const findsome = await prisma.profile.findFirst({
        where:{userId:userid.id}
    })
    if(findsome===null){
        return res.status(400).json({
            "success":false,
            "data":"profile doesn't exist"
        })
    }
      
     const update= await prisma.profile.update({
        where:{userId:userid.id},
        data:{
            city:profiledata.city||findsome.city,
            Image:profiledata.Image||findsome.Image,
            phone_number:profiledata.phone_number||findsome.phone_number,
            address:profiledata.address||findsome.address,
            state:profiledata.state||findsome.state,
            country:profiledata.country||findsome.country,
            pincode:profiledata.pincode||findsome.pincode
        }
     })
    channel.sendToQueue(
    "PROFILE:UPDATED",
    Buffer.from(
      JSON.stringify({
    update
      })
    )
     );

    
    
      return res.status(200).json(update)
}