import jwt from "jsonwebtoken";

//authenticateToken Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
};

export const generateAccessToken = (user: string | object) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "30s",
  });
};

export const generateRefreshAccessToken = (user: string | object) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
};

export default authenticateToken;
