import express from 'express';
import authRoutes from './authentication'
import transport from './transport';
const router = express.Router();

export default (): express.Router => {
    authRoutes(router);
    transport(router);

    return router;
}

