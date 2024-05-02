import express from 'express';
import { calculateFoodCarbonFootPrint } from '../controllers/food.controller';



    export default (router: express.Router )=>{
        router.post('/carbon/food/calculate', calculateFoodCarbonFootPrint);

}