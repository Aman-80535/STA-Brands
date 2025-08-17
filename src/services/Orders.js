import { db } from "../firebase"; // your firebase init file
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

// Get all orders
export const getOrders = async () => {
  // sort by "date" (descending → latest first)
  const q = query(
    collection(db, "orders"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// Add new order
// export const createOrder = async (orderData) => {
//   const docRef = await addDoc(collection(db, "orders"), orderData);
//   return { id: docRef.id, ...orderData };
// };

// Update order
export const updateOrder = async (id, data) => {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, data);
};

// Delete order
export const deleteOrder = async (id) => {
  const orderRef = doc(db, "orders", id);
  await deleteDoc(orderRef);
};
