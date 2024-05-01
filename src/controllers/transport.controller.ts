import {
  transport,
  TransportType,
  food,
  getInternetUsageCarbonImpact,
  ElectricityType,
  electricity,
  purchase,
  fashion,
  streaming,
  meal,
} from "carbon-footprint";
import { Request, Response } from "express";
import { TransportSchema } from "../schema/TransportSchema";
import Transport from "../models/Transport";

interface CalculateType {
  distance: number;
  duration: number;

}

export const calculateBusCarbonFootPrint = async ( req: Request,res: Response) => {
  const { distance, duration }: CalculateType = req.body;
  try {
    if (!distance || !duration)
      return res.status(400).json({ message: "All fields are requried" });

    let emmisionFactor = transport.bus;

    if (!emmisionFactor)
      return res.status(400).json({ message: "Invalid mode" });

    if (duration > 180) {
      emmisionFactor = transport.longDistanceBus;
    } else {
      emmisionFactor = transport.shortDistanceBus;
    }

    let carbonFootprint = distance * emmisionFactor;

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const transportData = {
      mode: "bus",
      duration,
      distance,
      carbonEmission: carbonFootprint,
      userId: (req.user as { _id: string })._id.toString(),
    };

    const userId = (req.user as { _id: string })._id;
    console.log(userId);

    const parseTransportData = TransportSchema.parse(transportData);

    const newTransportData = await Transport.create(parseTransportData);

    if (newTransportData) {
      return res.json({ message: "Successfully created" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const calculateCarCarbonFootPrint = async ( req: Request,res: Response) => {
    const { distance, duration }: CalculateType = req.body;
    try {
      if (!distance || !duration)
        return res.status(400).json({ message: "All fields are requried" });
  
      let emmisionFactor = transport.car;
  
      if (!emmisionFactor)
        return res.status(400).json({ message: "Invalid mode" });

  
      let carbonFootprint = distance * emmisionFactor;
  
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      const transportData = {
        mode: "car",
        duration,
        distance,
        carbonEmission: carbonFootprint,
        userId: (req.user as { _id: string })._id.toString(),
      };
  
      const userId = (req.user as { _id: string })._id;
      console.log(userId);
  
      const parseTransportData = TransportSchema.parse(transportData);
  
      const newTransportData = await Transport.create(parseTransportData);
  
      if (newTransportData) {
        return res.json({ message: "Successfully created" });
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  export const calculateElectricCarCarbonFootPrint = async ( req: Request,res: Response) => {
    const { distance, duration }: CalculateType = req.body;
    try {
      if (!distance || !duration)
        return res.status(400).json({ message: "All fields are requried" });
  
      let emmisionFactor = transport.electricVehicle;
  
      if (!emmisionFactor)
        return res.status(400).json({ message: "Invalid mode" });

  
      let carbonFootprint = distance * emmisionFactor;
  
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      const transportData = {
        mode: "electric car",
        duration,
        distance,
        carbonEmission: carbonFootprint,
        userId: (req.user as { _id: string })._id.toString(),
      };
  
      const userId = (req.user as { _id: string })._id;
      console.log(userId);
  
      const parseTransportData = TransportSchema.parse(transportData);
  
      const newTransportData = await Transport.create(parseTransportData);
  
      if (newTransportData) {
        return res.json({ message: "Successfully created" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const calculateTrainCarbonFootPrint = async ( req: Request,res: Response) => {
    const { distance, duration }: CalculateType = req.body;
    try {
      if (!distance || !duration)
        return res.status(400).json({ message: "All fields are requried" });
  
      let emmisionFactor = transport.train;
  
      if (!emmisionFactor)
        return res.status(400).json({ message: "Invalid mode" });

  
      let carbonFootprint = distance * emmisionFactor;
  
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      const transportData = {
        mode: "train",
        duration,
        distance,
        carbonEmission: carbonFootprint,
        userId: (req.user as { _id: string })._id.toString(),
      };
  
      const userId = (req.user as { _id: string })._id;
      console.log(userId);
  
      const parseTransportData = TransportSchema.parse(transportData);
  
      const newTransportData = await Transport.create(parseTransportData);
  
      if (newTransportData) {
        return res.json({ message: "Successfully created" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const calculateBikeCarbonFootPrint = async ( req: Request,res: Response) => {
    const { distance, duration }: CalculateType = req.body;
    try {
      if (!distance || !duration)
        return res.status(400).json({ message: "All fields are requried" });
  
      let emmisionFactor = transport.motorbike;
  
      if (!emmisionFactor)
        return res.status(400).json({ message: "Invalid mode" });

  
      let carbonFootprint = distance * emmisionFactor;
  
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      const transportData = {
        mode: "bike",
        duration,
        distance,
        carbonEmission: carbonFootprint,
        userId: (req.user as { _id: string })._id.toString(),
      };
  
      const userId = (req.user as { _id: string })._id;
      console.log(userId);
  
      const parseTransportData = TransportSchema.parse(transportData);
  
      const newTransportData = await Transport.create(parseTransportData);
  
      if (newTransportData) {
        return res.json({ message: "Successfully created" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const calculateFlightCarbonFootPrint = async (req: Request, res: Response) =>{

    const { distance, duration }: CalculateType = req.body;
    try {
      if (!distance || !duration)
        return res.status(400).json({ message: "All fields are requried" });
  
      let emmisionFactor = transport.bus;
  
      if (!emmisionFactor)
        return res.status(400).json({ message: "Invalid mode" });
  
      if (duration > 180) {
        emmisionFactor = transport.shortHaulFlight;
      } else if(duration < 360){
        emmisionFactor = transport.mediumHaulFlight;
      }else{
        emmisionFactor = transport.longHaulFlight
      }
  
      let carbonFootprint = distance * emmisionFactor;
  
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
  
      const transportData = {
        mode: "flight",
        duration,
        distance,
        carbonEmission: carbonFootprint,
        userId: (req.user as { _id: string })._id.toString(),
      };
  
      const userId = (req.user as { _id: string })._id;
      console.log(userId);
  
      const parseTransportData = TransportSchema.parse(transportData);
  
      const newTransportData = await Transport.create(parseTransportData);
  
      if (newTransportData) {
        return res.json({ message: "Successfully created" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  