import { prismaClient } from "../index";

export class UserRepository {
  async findByEmail(email: string) {
    return prismaClient.user.findFirst({ where: { email } });
  }

  async createUser(data: { name: string; email: string; password: string }) {
    return prismaClient.user.create({ data });
  }
}
