import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from './db.js';

const secretKey = process.env.JWT_SECRET_KEY;

export function createUser(email, password) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (user) {
    throw new Error("User  creation failed.");
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, hashedPassword);
  const token = jwt.sign({ id: result.lastInsertRowid }, secretKey, {
    expiresIn: '1h'
  });

  return token;
}

export function login(email, password) { }