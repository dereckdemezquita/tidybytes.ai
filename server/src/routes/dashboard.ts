import { Request } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import { userSchema } from '../models/user';
import { authJWT } from '../middleware/authJWT';

const router = express.Router();
const User = mongoose.model('user', userSchema, 'users');

router.get('/api/dashboard/get_user_data', authJWT, async (req: Request, res) => {
    const user = await User.findById(req.user!._id).select('-password'); // req.user is now available thanks to the middleware

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
});

export default router;