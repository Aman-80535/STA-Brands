import { useAuth } from "../context/AuthContext";
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


export const getBatchedOrders = async () => {
  // sort by "date" (descending → latest first)
  const q = query(
    collection(db, "batches"),
    orderBy("created_at", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const fetchOrdersByBatchId = async (batchId) => {
  try {
    const q = query(collection(db, 'orders'), where('batch_id', '==', batchId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No orders found for this batch.');
      return [];
    }

    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id, // Firestore document ID (order_id)
      ...doc.data()
    }));

    console.log('Orders for batch:', batchId, orders);
    return orders;

  } catch (error) {
    console.error('Error fetching orders by batchId:', error);
    throw error;
  }
};