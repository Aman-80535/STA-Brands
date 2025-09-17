export const manufacturerColumns = [
  { label: "Batch ID", key: "batch_id" },
  { label: "Item ID", key: "productId" },
  { label: "Date", key: "created_at" },
  { label: "Qty", key: "sizing_breakdown" },
  { label: "View Image", key: "image" },
  { label: "status", key: "status" },
  { label: "Action", key: "action" ,isAction: true},
  { label: "Orders List", key: "ordersList",  },
];

export const adminColumns = [
  { label: "Batch ID", key: "batch_id" },
  { label: "Item ID", key: "productId" },
  { label: "Date", key: "created_at" },
  { label: "Qty", key: "sizing_breakdown" },
  { label: "View Image", key: "image" },
  { label: "status", key: "status" },
  { label: "Action", key: "action" ,isAction: true},
  { label: "Orders List", key: "ordersList",  },
];


export const orders = [
  {
    id: 1,
    batchId: "B001",
    itemId: "TSH-1001",
    date: "2025-09-14 to 2025-09-15,  12 Am- 12Am",
    quantity: 200,
    payment: "Paid",
    status: "Inprocess",
    batchStatus: "Done"
  },
  {
    id: 2,
    batchId: "B002",
    itemId: "TSH-1002",
    date: "2025-09-13",
    quantity: 150,
    payment: null,
    batchStatus: "Pending"

  }
];