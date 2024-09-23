import { Router } from 'express';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/registerUser', async (req, res) => {
  try {
    const response = req.body.user;
    const hashedPassword = await bcrypt.hash(response.password, 7);

    const newUser = new User({
      username: response.username,
      email: response.email,
      phoneNumber: response.phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    const errorObj = Object.values(error.errors);
    console.log(errorObj);

    return res.status(500).json({ message: errorObj });
  }
});

export default router;
