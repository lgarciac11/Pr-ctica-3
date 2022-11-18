import { RouterContext } from "oak/router.ts";
import { AuthorSchema, BooksSchema, UserSchema } from "../db/schemas.ts";
import { UsuariosCollection, LibrosCollection, AutoresCollection } from "../db/mongo.ts";
import { User } from "../types.ts";
import { Books } from "../types.ts";
import { Author } from "../types.ts";

type PostAddUserContext = RouterContext<
  "/users",
  Record<string | number, string | undefined>, //llega
  Record<string, any> //sale
>;

type PostAddBookContext = RouterContext<
  "/books",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

type PostAddAuthorContext = RouterContext<
  "/author",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const addUser = async (context: PostAddUserContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const user: User = await result.value;

    console.log({ user })

    const insertResult = UsuariosCollection.insertOne(user);
    console.log({ insertResult })

    context.response.status = 200;
    context.response.body = user;

  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

export const addBook = async (context: PostAddBookContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const bookWithoutId: Books = await result.value;

    console.log({ bookWithoutId })

    const insertResult = LibrosCollection.insertOne(bookWithoutId);

    console.log({insertResult})

    context.response.status = 200;
    context.response.body = bookWithoutId;

  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};
export const addAuthor = async (context: PostAddAuthorContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const author: Author = await result.value;

    console.log({ author })

    const insertResult = AutoresCollection.insertOne(author);
    context.response.status = 200;
    context.response.body = author;

  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};