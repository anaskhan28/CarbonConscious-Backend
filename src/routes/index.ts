import express from 'express';
import authRoutes from './authentication'
import transport from './transport';
import food from './food';
import totalCarbon from './totalCarbon';
const router = express.Router();

export default (): express.Router => {
    authRoutes(router);
    transport(router);
    food(router);
    totalCarbon(router);

    return router;
}

