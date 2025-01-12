import { prismaClient } from "../index";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { NotFoundException } from "../exceptions/notFoundException";
import { BadRequestException } from "../exceptions/badRequestException";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";

export const signupService = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestException(
      "User already exists!",
      ErrorCode.ALREADY_EXISTS
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  return user;
};

export const loginService = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found.", ErrorCode.NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException("Incorrect password", ErrorCode.BAD_REQUEST);
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { user, token };
};
