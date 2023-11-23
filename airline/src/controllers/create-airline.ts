import { Request,Response } from "express";
import {z} from 'zod'
import { Airline } from "../models/airline";
import * as amqp from 'amqplib';
export async function createairline(req:Request,res:Response) {
  try { 
        let channel
         const amqpServer = "amqps://rmgykywi:FAXeDfV9FCux1vkhRqyr2cj4TLtAYOcI@puffin.rmq2.cloudamqp.com/rmgykywi";
         const connection = await amqp.connect(amqpServer);
         channel = await connection.createChannel();
         await channel.assertQueue('AIRLINE:CREATED');
        const details = z.object({
            name:z.string(),
            terms_and_conditions:z.string()
        })
        const data =req.body;
        const parsedinput =details.safeParse(data);
        if(parsedinput.success===false){
          return res.status(400).json({
              "success":false,
              "data":"pls provide correct input"
          })
        }
        const name =parsedinput.data.name;
  
        const terms_and_conditions=parsedinput.data.terms_and_conditions;
        
        const findsome = await Airline.findOne({name});
       
        if(findsome){
          return res.status(400).json({
              "success":false,
              "data":"airline already exists"
          })
        }
        const insertdata = new Airline({
          name,terms_and_conditions
        })
    const inserted = await insertdata.save();
    channel.sendToQueue(
    'AIRLINE:CREATED',
    Buffer.from(
      JSON.stringify({
        inserted
      })
    )
     );
       
  
  
        return res.json(inserted)
      }catch(err){
          return res.status(502).json({
              "success":false,
              "data":err
          })
      }
  
        
  
  
}