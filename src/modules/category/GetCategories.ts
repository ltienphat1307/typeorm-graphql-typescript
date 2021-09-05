import { Resolver, Query } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Category } from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";

@Resolver((_type) => Category)
export class GetCategories {
  constructor(
    @InjectRepository()
    private readonly categoryRepository: CategoryRepository
  ) {}

  @Query((_type) => [Category])
  public async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ["products"],
    });

    return categories;
  }
}
