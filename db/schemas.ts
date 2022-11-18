import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Author,Books,User } from "../types.ts";

export type AuthorSchema = Author & {
  _id: ObjectId;
};

export type BooksSchema = Books & {
  _id: ObjectId;
};

export type UserSchema = User & {
  _id: ObjectId;
};