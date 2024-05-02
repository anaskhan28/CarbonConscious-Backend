import express, {Request, Response} from 'express';
import { calculateBusCarbonFootPrint, calculateTrainCarbonFootPrint, calculateBikeCarbonFootPrint, calculateCarCarbonFootPrint,
    calculateElectricCarCarbonFootPrint, calculateFlightCarbonFootPrint
 } from '../controllers/transport.controller';


    export default (router: express.Router )=>{
        router.post('/carbon/bus/calculate', calculateBusCarbonFootPrint);
        router.post('/carbon/car/calculate', calculateCarCarbonFootPrint);
        router.post('/carbon/train/calculate', calculateTrainCarbonFootPrint);
        router.post('/carbon/flight/calculate', calculateFlightCarbonFootPrint);
        router.post('/carbon/bike/calculate', calculateBikeCarbonFootPrint);
        router.post('/carbon/e-car/calculate', calculateElectricCarCarbonFootPrint);
}