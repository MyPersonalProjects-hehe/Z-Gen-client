import { json, Router } from 'express';
import User from '../model/User.js';

const router = Router();

router.post('/loginUser', async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.session.user = {
        id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        phoneNumber: userExists.phoneNumber,
      };
    } else {
      res.status(401).json({ message: 'Invalid email or password!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'No records found!' });
  }
});

router.get('/user', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json('Not authenticated!');
  }
});

export default router;
