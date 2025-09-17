import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase"; // adjust path as needed

export const createOrUpdateUser = async (form) => {
  const { email, name, password, role, phone } = form;

  try {
    // Step 1: Check if a user with this email exists in Firestore
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // ✅ User exists — update their role
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);

      await updateDoc(userRef, {
        role: role || "user",
        name,
        phone,
        updated_at: serverTimestamp(),
      });

      alert("User already exists. Role updated.");
      return;
    }

    // Step 2: Check if user exists in Firebase Auth too (optional, but safe)
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      throw new Error("A Firebase Auth user already exists with this email, but no Firestore record was found.");
    }

    // Step 3: Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Step 4: Create user in Firestore
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      uid,
      email,
      name,
      phone: phone || "",
      role: role || "user",
      created_at: serverTimestamp(),
    });

    alert("New user created.");
  } catch (error) {
    console.error("User creation error:", error.message);
    alert(error.message);
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};