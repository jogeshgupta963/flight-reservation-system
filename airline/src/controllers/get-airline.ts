import { Request,Response } from "express";
import {z} from 'zod'
import { Airline } from "../models/airline";

export async function getairline(req:Request,res:Response) {
    try{
        const details = z.object({
            id:z.string(),
            
        })
        const data =req.query;
        console.log(data)
        const parsedinput =details.safeParse(data);
        if(parsedinput.success===false){
          return res.status(400).json({
              "success":false,
              "data":"pls provide correct input"
          })
        }
        const id =parsedinput.data.id;
  
        
        const findsome = await Airline.findById(id);
       
        if(!findsome){
          return res.status(400).json({
              "success":false,
              "data":"airline doesn't exist"
          })
        }
        return res.status(200).json(findsome)


       
      }catch(err){
          return res.status(500).json({
              "success":false,
              "data":err
          })
      }
  
        
  
  
}