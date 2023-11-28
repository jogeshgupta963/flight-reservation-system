
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {z} from 'zod'
import { Request ,Response} from 'express';
import { UserPayload } from '../middlewares/auth';
import * as amqp from 'amqplib';

export async function createprofile(req: Request, res: Response) {
         let channel
         const connection = await amqp.connect("amqps://rmgykywi:FAXeDfV9FCux1vkhRqyr2cj4TLtAYOcI@puffin.rmq2.cloudamqp.com/rmgykywi");
         channel = await connection.createChannel();
         await channel.assertQueue('PROFILE:CREATED');

const input = z.object({
    Image: z.string(),

    phone_number: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
});
    const profiledata = req.body;
    const userid = req.user as UserPayload;
    const parsed = input.safeParse(profiledata);
    if (parsed.success === false) {
        return res.status(400).json({
            success: false,
            data: "pls provide correct input",
        });
    }
    const find = await prisma.profile.findFirst({
        where: {
            userId: userid?.id,
        },
    });
    if (find !== null) {
        return res.status(400).json({
            success: false,
            data: "profile already exists ",
        });
    }
    const findsome = await prisma.profile.create({
        data: {
            userId: userid.id,
            Image: parsed.data.Image,
            phone_number: parsed.data.phone_number,
            address: parsed.data.address,
            city: parsed.data.city,
            country:parsed.data.country,
            pincode:parsed.data.pincode,
            state:parsed.data.state

        }
     })
    channel.sendToQueue(
    'PROFILE:CREATED',
    Buffer.from(
      JSON.stringify({
    findsome
      })
    )
     );

    return res.status(200).json(findsome);
}
