import React, { useEffect, useState } from 'react';
import './OrderList.css';
import API from '../api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/api/orders')
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
      });
  }, []);

  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Bundles</th>
            <th>Thickness</th>
            <th>Finish</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                {order.bundles.length > 0
                  ? order.bundles.map(b => b.bundle || '-').join(', ')
                  : '-'}
              </td>
              <td>
                {order.bundles.length > 0
                  ? order.bundles.map(b => b.thickness || '-').join(', ')
                  : '-'}
              </td>
              <td>
                {order.bundles.length > 0
                  ? order.bundles.map(b => b.finish || '-').join(', ')
                  : '-'}
              </td>
              <td>
                {order.bundles.length > 0 ? (
                  order.bundles.map((b, idx) => (
                    <span key={idx} className={`status-pill status-${b.status || 'available'}`}>
                      {b.status || 'available'}
                    </span>
                  ))
                ) : (
                  <span className="status-pill status-available">N/A</span>
                )}
              </td>
              <td>{order.notes || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
