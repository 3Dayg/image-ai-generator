import express from 'express';
import { createUser, login } from './auth.js';

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    debugger;
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 8
    ) {
      return res.send(400, 'Invalid email or password');
    }

    const token = createUser(email, password);
    res.send(201, 'User created', token);
  } catch (err) {
    res.send(500, 'Creating user failed');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    login(email, password);
  } catch (err) {
    res.send(500, 'Something went wrong');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});