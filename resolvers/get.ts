import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { ObjectId } from "mongo";
import { RouterContext } from "oak/router.ts";
import { LibrosCollection, AutoresCollection, UsuariosCollection } from "../db/mongo.ts";
import {User} from "../types.ts";
import {Books} from "../types.ts";

type GetBooksContext = RouterContext<
  "/books",
  Record<string | number, string | undefined>,
  Record<string, any>
>;
type GetUserContext = RouterContext<
  "/id",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const getBooks = async (context: GetBooksContext) => {
  try {
    const params = getQuery(context, { mergeParams: true });
    if (!params.page) { 
      context.response.status = 403;
      return;
    }

    const { page, title } = params;

    const filter: { page: number; title?: string } = {
      page: parseInt(page),
    }

    if (title) {
      filter.title = title;
    }

    const books = await LibrosCollection.find(filter,{limit: 10}).toArray();
    context.response.body = books.map((book) => {
      const {_id, ...rest} = book;

      return {...rest};
    })
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};

 export const getUser = async (context: GetUserContext) => {
   try {
    const id = new ObjectId(context.params?.id);

    const result = await UsuariosCollection.findOne({
      _id: id,
    });
  
    if (!result) {
      context.response.status = 404;
      return;
    }

   } catch (e) {
     console.error(e);
     context.response.status = 500;
   }
 };