import express from 'express';
import authenticationRoutes from './authentication'

const router = express.Router();

export default (): express.Router => {
    router.use('/auth/user', authenticationRoutes)
    return router;
}