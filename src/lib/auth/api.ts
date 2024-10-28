import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SignInData, SignUpFormValues, UserData } from "./types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { db } from "@/firebase";

export const signInAPI = async ({
  email,
  password,
}: SignInData): Promise<UserData> => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) throw new Error("계정 정보를 찾을 수 없습니다.");

  const userData = userDoc.data();
  const token = await user.getIdToken();
  Cookies.set("accessToken", token, { expires: 7 });

  return {
    uid: user.uid,
    email: user.email || "",
    nickname: userData.nickname,
    isSeller: userData.isSeller,
    accessToken: token,
  };
};

export const signUpAPI = async ({
  email,
  password,
  nickname,
  isSeller,
}: SignUpFormValues): Promise<UserData> => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    nickname,
    email: user.email,
    isSeller,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const token = await user.getIdToken();
  Cookies.set("accessToken", token, { expires: 7 });

  return {
    uid: user.uid,
    email: user.email || "",
    nickname,
    isSeller,
  };
};
