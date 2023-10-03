import { auth, provider } from "@src/firebase/client";
import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

type UserState = User | null;

const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const login = (): Promise<void> => {
  const _provider = provider;
  const _auth = auth;
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const _auth = auth;
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const _auth = auth;
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};

export const makeUserDatabase = () => {
  // write initial data of new users on realtime database.
};
