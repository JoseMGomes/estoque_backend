import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repository/userRepository";
import { SignupInput, LoginInput, AuthResponse } from "../models/userModels";
import { ErrorResponse } from "../exceptions/errorResponse";
import { ErrorCode } from "../constants/errorCode";
import { ErrorMessage, ErrorMessageUser } from "../constants/errorMessage";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data: SignupInput) {
    const { name, email, password } = data;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ErrorResponse(ErrorMessageUser.ALREADY_EXISTS, ErrorCode.ALREADY_EXISTS);
    }

    const hashedPassword = hashSync(password, 10);
    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ErrorResponse(ErrorMessageUser.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
      throw new ErrorResponse(ErrorMessage.INVALID_CREDENTIALS, ErrorCode.UNAUTHORIZED);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }


  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      return decoded; 
    } catch (error) {
      throw new ErrorResponse(ErrorMessage.INVALID_TOKEN, ErrorCode.UNAUTHORIZED);
    }
  }
}
