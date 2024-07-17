import { ISignInDto, ISignUpDto } from "./types";
import { HttpStatus } from "../../../enums";
import { UserRepository } from "./_user/user.repository";
import { UserEntity } from "./_user/user.entity";
import crypto from "crypto";
import * as UtilService from "./utils.service";
import * as JwtService from "./jwt.service";

export const findUserById = async (id: number) => {
  const user = await UserRepository.findOneBy({ id });
  return user?.sanitize();
};

export const signUp = async (payload: ISignUpDto) => {
  const { email, password, username } = payload;

  let userExists = await UserRepository.findOne({ where: { email } });

  if (userExists) {
    return { status: false, message: "Email already in use.", statusCode: HttpStatus.BAD_REQUEST };
  }

  userExists = await UserRepository.findOne({ where: { username } });

  if (userExists) {
    return {
      status: false,
      message: "Username already in use.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = UtilService.hashPassword(password, salt);

  const entity = UserRepository.create({ ...payload, salt, password: hashedPassword });
  const user = (await UserRepository.save(entity)) as UserEntity;

  return {
    status: true,
    message: "Sign up successful",
    data: user.sanitize(),
    statusCode: HttpStatus.OK,
  };
};

export const signIn = async (payload: ISignInDto) => {
  const { email, password } = payload;
  const userExists = await UserRepository.findUserWithPasswordAndSalt(email);

  if (!userExists) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  // TODO: Ensure User Email has been verified
  // TODO: Ensure User Phone number has been verified

  const isMatch = UtilService.comparePassword(password, userExists.salt, userExists.password);

  if (!isMatch) {
    return {
      status: false,
      message: "Invalid Credentials.",
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const accessToken = JwtService.signAccessToken({
    id: userExists.id,
    public_id: userExists.public_id,
    email: userExists.email,
  });
  const refreshToken = JwtService.signRefreshToken({
    id: userExists.id,
    public_id: userExists.public_id,
    email: userExists.email,
  });

  return {
    status: true,
    message: "Login Successful",
    statusCode: HttpStatus.OK,
    data: {
      token: { access_token: accessToken, refresh_token: refreshToken },
      user: userExists.sanitize(),
    },
  };
};
