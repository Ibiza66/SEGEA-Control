import jwt from "jsonwebtoken";

export function generateToken(userId: string, role: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está definido");
  }

  return jwt.sign(
    {
      id: userId,
      role,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}