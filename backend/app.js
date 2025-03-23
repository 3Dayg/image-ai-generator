import express from 'express';
import { createUser, enforceAuth, login } from './auth.js';
import { generateImage } from './image.js';

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
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
  // add
  // wrong token
  // no token error differentiation
  try {
    const { email, password } = req.body;
    const token = login(email, password);
    console.log("token", token)
    res.send(200, 'Login successful', token);
  } catch (err) {
    if (err.status === 400) {
      return res.send(400, { error: err.message });
    }
    res.send(500, 'Login failed');
  }
});

app.post('/generate-image', enforceAuth, async (req, res) => {
  const { prompt, options } = req.body;

  const { image, format } = await generateImage(prompt, options);
  res.type(format);
  res.send(201,image);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});