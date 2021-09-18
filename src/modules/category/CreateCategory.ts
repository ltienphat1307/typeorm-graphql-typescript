import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";

import { Category } from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateCategoryInput } from "./CreateCategoryInput";

@Resolver((_type) => Category)
export class CreateCategory {
  @Mutation((_type) => Category)
  public async createCategory(
    @Arg("data") inputData: CreateCategoryInput
  ): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);
    const category = categoryRepository.create({
      name: inputData.name,
      code: inputData.code,
    });

    await categoryRepository.save(category);
    return category;
  }
}
