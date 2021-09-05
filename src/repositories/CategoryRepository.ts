import { EntityRepository, Repository } from "typeorm";
import { Category } from "../models/Category";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
