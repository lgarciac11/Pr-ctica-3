import { Application, Router } from "oak";

import { getBooks, getUser } from "./resolvers/get.ts";
import { addAuthor, addBook, addUser } from "./resolvers/post.ts";
import { deleteUser } from "./resolvers/delete.ts";



const router = new Router();

router
 .get("/books", getBooks)
 .get("/id", getUser)
 .post("/books", addBook)
 .post("/users", addUser)
 .post("/authors", addAuthor)
 .delete("/users", deleteUser)  // domain.com/api/users/oujoer342231


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

 const port_number = Deno.env.get("PORT");
 console.log('Connected to port')
 if (port_number) {
   console.log(port_number)
   await app.listen({ port: parseInt(port_number) });
 }
 else {
   console.log(7777)

  await app.listen({ port: 7777 });
 }
