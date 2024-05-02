import express from 'express';
import authRoutes from './authentication'
import transport from './transport';
import food from './food';
const router = express.Router();

export default (): express.Router => {
    authRoutes(router);
    transport(router);
    food(router);

    return router;
}

