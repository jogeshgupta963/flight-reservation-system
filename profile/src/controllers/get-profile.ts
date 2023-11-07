import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {z} from 'zod'
import { Request ,Response} from 'express';
import { UserPayload } from '../middlewares/auth';



export async function getprofile(req:Request,res:Response) {
    const profiledata = req.user as UserPayload;
    
    
      const find = await prisma.profile.findFirst({
        where:{
            userId :profiledata?.id
        }
     })
      if(find===null){
        return res.status(400).json({
            "success":false,
            "data":"profile doesn't exist"
        })
     }
    

    
    
      return res.status(200).json(find)
}