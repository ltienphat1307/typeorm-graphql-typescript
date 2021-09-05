import { buildSchema } from "type-graphql";

import { CreateCategory } from "./modules/category/CreateCategory";
import { GetCategories } from "./modules/category/GetCategories";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [CreateCategory, GetCategories],
  });
};
