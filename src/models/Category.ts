import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Product } from "./Product";

@ObjectType()
@Entity()
@Unique(["code"])
export class Category {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "varchar" })
  public code!: string;

  @Field()
  @Column({ type: "varchar" })
  public name!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [Product])
  @OneToMany((_type) => Product, (product: Product) => product.category)
  public products?: Product[];
}
