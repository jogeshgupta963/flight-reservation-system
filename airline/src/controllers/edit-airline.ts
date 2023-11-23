import { Request,Response } from "express";
import {z} from 'zod'
import { Airline } from "../models/airline";
import * as amqp from 'amqplib'
export async function editairline(req:Request,res:Response) {
    try {
        let channel
         const amqpServer = "amqps://rmgykywi:FAXeDfV9FCux1vkhRqyr2cj4TLtAYOcI@puffin.rmq2.cloudamqp.com/rmgykywi";
         const connection = await amqp.connect(amqpServer);
         channel = await connection.createChannel();
         await channel.assertQueue('AIRLINE:UPDATED');
        const details = z.object({
            id: z.string(),
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
        const id =parsedinput.data.id;
        const name =parsedinput.data.name;
  
        const terms_and_conditions=parsedinput.data.terms_and_conditions;
        
        const findsome = await Airline.findById(id);
      
       
        if(!findsome){
          return res.status(400).json({
              "success":false,
              "data":"this airline doesn't exist"
          })
        }
        const changed = await Airline.findByIdAndUpdate(id,{name,terms_and_conditions},{new:true})
   
      channel.sendToQueue(
    'AIRLINE:UPDATED',
    Buffer.from(
      JSON.stringify({
        changed
      })
    )
        ); 

  
  
        return res.json(changed)
      }catch(err){
          return res.status(500).json({
              "success":false,
              "data":err
          })
      }
  
        
  
  
}