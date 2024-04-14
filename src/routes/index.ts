import express from 'express';
import authRoutes from './authentication'
const router = express.Router();

export default (): express.Router => {
    authRoutes(router)
    return router;
}

