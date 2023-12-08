import {
  doc,
  updateDoc,
  setDoc,
  addDoc,
  where,
  collection,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";

type BoolDay = {
  morning: boolean;
  day: boolean;
  night: boolean;
};
type VotedCategory = {
  teishoku: boolean;
  noodle: boolean;
  don: boolean;
  curry: boolean;
};

export type UserProps = {
  uid: string;
  points: number;
  couponID: string[];
  boolDay: boolean[];
  votedCategoryPerDay: boolean[];
  registeredRatingMenuID: string[];
};

export const checkUser: any = async (db: any, uid: string) => {
  const collRef = collection(db, "Users");
  const q = query(collRef, where("uid", "==", uid));
  const docSnap = await getDocs(q);

  docSnap.forEach((doc) => {
    if (doc.exists()) {
      console.log("user was found");
      return true;
    } else {
      console.log("No such document.");
      return false;
    }
  });
};

export const getUser: any = async (
  db: any,
  uid: string,
  setFunc?: Function
) => {
  /* Usage
    getUser(db, uid).then((value) => {your processing})
    */
  console.log(`loading data at ${uid}`);
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists() && docSnap.data()) {
    if (setFunc) setFunc(docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document.");
  }
};

export const newUser = async (db: any, uid: string, saveUser: UserProps) => {
  /* Usage
    newMenu(db, uid, userObject)
    */
  const _saveUser = saveUser;
  const d = doc(db, "Users", uid);
  await setDoc(d, _saveUser);
  console.log(`Document uploaded at ${uid}`);
};

export const updateUser = async (
  db: any,
  uid: string,
  newUserProps: UserProps
) => {
  /* Usage
    updateMenu(db, user{stars: 4.5});
    */
  const newUser = newUserProps;
  const docRef = doc(db, "Users", uid);
  updateDoc(docRef, newUser);
};
