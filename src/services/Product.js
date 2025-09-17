import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const addProduct = (async (productData, thunkAPI) => {
	try {
		const docRef = await addDoc(collection(db, "products"), productData);
		return { id: docRef.id, ...productData, created_at: serverTimestamp() };
	} catch (error) {
		return (error.message);
	}
}
);



export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const data = { id: productSnap.id, ...productSnap.data() };
      console.log("Product data:", data);
      return data;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};