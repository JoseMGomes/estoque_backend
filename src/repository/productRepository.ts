import { prismaClient } from "../index";

export class ProductRepository {
  async create(data: any) {
    return await prismaClient.product.create({
      data,
    });
  }

  async delete(id: number) {
    await prismaClient.product.delete({
      where: { id },
    });
  }

  async list() {
    return await prismaClient.product.findMany();
  }

  async getById(id: number) {
    return await prismaClient.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return await prismaClient.product.update({
      where: { id },
      data,
    });
  }
}
