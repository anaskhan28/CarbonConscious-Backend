import express from 'express';
import { getTotalCarbonEmission } from '../controllers/totalCarbon.controller';



    export default (router: express.Router )=>{
        router.get('/total/carbon', getTotalCarbonEmission);

}