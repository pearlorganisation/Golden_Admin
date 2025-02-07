import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllorders } from "../../features/actions/ordersAction";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ListOrders = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.order);
  console.log("data", data);

  useEffect(() => {
    dispatch(getAllorders());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-red-600 mb-4">List of Orders</h2>
      {data?.orders?.data?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Email</TableCell>
                <TableCell>OrderStatus</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Payment Status</TableCell>                
                <TableCell>Title</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.orders.data.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.mobileNumber}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default ListOrders;
