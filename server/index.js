import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';

config();
const app = express();
app.use(json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

connect(process.env.MONGO_URI)
  .then(() => console.log('CONNECTED TO MONGO'))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log('Server is running');
});

app.use(registerRouter);
app.use(loginRouter);
