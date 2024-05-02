import { food, FoodType } from "carbon-footprint";
import { Request, Response } from "express";
import Food from "../models/Food";

interface CalculateType {
  name: FoodType;
  quantity: number;
}

export const calculateFoodCarbonFootPrint = async (req: Request, res: Response) => {
  const { name, quantity }: CalculateType = req.body;

  try {
    let emissionFactor = food[name];

    let carbonFootprint = quantity * emissionFactor;
    
   if(carbonFootprint>=1000){
    carbonFootprint = carbonFootprint/1000
   }
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
    const foodData = {
      name,
      quantity,
      carbonEmission: carbonFootprint,
      userId: (req.user as { _id: string })._id.toString(),
      
    };

    const newFood = new Food(foodData);
    await newFood.save();

    res.status(201).json({ message: "Food carbon footprint calculated successfully", data: newFood });
    
} catch (error: any) {
    res.status(500).json({ message: "An error occurred", error: error.message });
}
}
