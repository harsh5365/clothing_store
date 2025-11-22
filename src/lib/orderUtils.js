/**
 * Order management utilities
 */

const ORDERS_STORAGE_KEY = 'fashionfox-orders';

export function loadOrders() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) return [];
    
    const orders = JSON.parse(stored);
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error('Failed to load orders:', error);
    return [];
  }
}

export function saveOrders(orders) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders:', error);
  }
}

export function createOrder(orderData) {
  const orders = loadOrders();
  
  const order = {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: `ORD-${Date.now().toString().slice(-8)}`,
    ...orderData,
    orderDate: Date.now(),
    status: 'pending'
  };
  
  orders.unshift(order);
  saveOrders(orders);
  
  return order;
}

export function getOrder(orderId) {
  const orders = loadOrders();
  return orders.find(order => order.id === orderId);
}

export function getUserOrders(userId) {
  const orders = loadOrders();
  return orders.filter(order => order.userId === userId);
}

export function sortOrdersByDate(orders) {
  return [...orders].sort((a, b) => b.orderDate - a.orderDate);
}
