import { Field, InputType } from "type-graphql";
import { Category } from "../../models/Category";

@InputType()
export class CreateCategoryInput implements Partial<Category> {
  @Field()
  public name!: string;

  @Field()
  public code!: string;
}
