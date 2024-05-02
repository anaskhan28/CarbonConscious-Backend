import {Request, Response} from 'express';
import Transport from '../models/Transport';
import Food from '../models/Food';

export const getTotalCarbonEmission = async (req: Request, res: Response) =>{
    const userId = (req.user as { _id?: string })?._id;
    console.log(userId)
     
    if(!userId){
        return res.status(401).json("Not Authenticated")
    }
    try{
        const transportEmissions = await Transport.aggregate([
            {$match: {userId: userId}},
            {
                $group:{
                    _id: null,
                    totalEmission: {$sum: "$carbonEmission"}
                }
            }
        ]);

        const foodEmissions = await Food.aggregate([
            {$match: {userId: userId}},
            {
                $group: {
                    _id: null,
                    totalEmission: {$sum: "$carbonEmission"}
                }
            }
        ]);

        let totalEmission = (transportEmissions[0]?.totalEmission|| 0) + (foodEmissions[0]?.totalEmission || 0)
        totalEmission = parseFloat(totalEmission.toFixed(2));
        return res.status(200).json({totalEmission, messages: 'Successfully generated'})
    }
    catch (error: any){
        res.status(500).json({message: "An error occured",error: error.message})
    }
}