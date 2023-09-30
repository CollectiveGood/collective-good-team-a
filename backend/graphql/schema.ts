import { PrismaClient } from "@prisma/client";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import "reflect-metadata";
import {
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  buildSchemaSync,
} from "type-graphql";
const prisma = new PrismaClient();

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field()
  Cases: [Case];
}

export class Case {
  @Field()
  url: string;

  @Field()
  id: number;

  @Field()
  uploader: User;
}

@Resolver(User)
export class UserResolver {
  @Query((returns) => [User], { nullable: true })
  async allUsers() {
    return prisma.user.findMany();
  }
}

@Mutation(User)
export class MutationResolver {}

const schema = buildSchemaSync({
  resolvers: [UserResolver],
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

app.listen(4000);
