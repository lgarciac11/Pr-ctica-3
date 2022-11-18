import { RouterContext } from "oak/router.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { UsuariosCollection } from "../db/mongo.ts";

type RemoveUserContext = RouterContext<
  "/users",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const deleteUser = async(context: RemoveUserContext) => {
  try {
    const id = new ObjectId(context.params?.id);

    const result = await UsuariosCollection.findOne({
      _id: id,
    });
    
    if (!result) {
      context.response.status = 404;
      return;
    }

    await UsuariosCollection.deleteOne({ _id: id });
    context.response.status = 200;
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};