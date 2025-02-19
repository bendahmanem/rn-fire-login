import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../config/firebase";

export const signin = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};
