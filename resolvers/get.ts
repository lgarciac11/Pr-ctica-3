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
    if (!params.page) { //con el id de mongoDB
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

// export const getUser = async (context: GetUserContext) => {
//   try {
//     const freeCars = await P3Collection.find({ free: true }).toArray();
//     if (freeCars.length > 0) {
//       const slot = freeCars[0];
//       const { _id, ...carWithoutId } = slot as P3Schema;

//       await P3Collection.updateOne(
//         {
//           _id,
//         },
//         {
//           $set: {
//             free: false,
//           },
//         }
//       );

//       context.response.body = {
//         ...carWithoutId,
//         id: _id.toString(),
//       };
//     } else {
//       context.response.status = 404;
//       context.response.body = { message: "No free cars" };
//     }
//   } catch (e) {
//     console.error(e);
//     context.response.status = 500;
//   }
// };