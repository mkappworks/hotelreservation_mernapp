import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import redisClient from "../redis/RedisClient";
require("dotenv/config");

import {
  generateAccessToken,
  generateRefreshAccessToken,
} from "../middleware/AuthenticateToken";

import Guest, { IGuest } from "../models/GuestModel";

const router = express.Router();

let refreshTokens: any[] = [];

router.post("/getnewtoken", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403).json({ message: err });
      const userDetails = {
        email: user.email,
        password: user.password,
      };
      console.log(userDetails);
      const accessToken = generateAccessToken(userDetails);
      res.json({ accessToken: accessToken });
    }
  );
});

router.post("/login", async (req, res) => {
  try {
    //check whether user in DB
    const user: IGuest | null = await Guest.findOne({ email: req.body.email });
    if (user == null) return res.status(400).send("Cannot find user");

    //Authenticate User
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userDetails = {
        email: user.email,
        password: user.password,
      };
      const accessToken = generateAccessToken(userDetails);
      const refreshToken = generateRefreshAccessToken(userDetails);

      //Pushed to a Redis Store
      refreshTokens.push(refreshToken);

      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Password Incorrect");
    }
  } catch (error) {
    res.status(500);
  }
});

router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token: any) => token !== req.body.token
  );
  res.sendStatus(204);
});

module.exports = router;
