import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
