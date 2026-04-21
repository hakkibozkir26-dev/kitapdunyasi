/**
 * orderModel.js - Sipariş verisi.
 */
import { sap_data } from './data.js';
import { getBaseData, saveData } from './crudModel.js';

const KEY = 'kd_orders';

export const getOrders = () => getBaseData(KEY, sap_data.orders);

export const updateOrderStatus = (id, status) => {
    const orders = getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    const updated = [...orders];
    updated[index] = { ...updated[index], status };
    saveData(KEY, updated);
    return updated[index];
};

export const getOrderItems = (orderId) => {
    const books = getBaseData('kd_books', sap_data.books);
    return sap_data.orderItems
        .filter(item => item.orderId === orderId)
        .map(item => ({
            ...item,
            book: books.find(b => b.id === item.bookId)
        }));
};

export const getOrdersByBook = (bookId) => {
    const orders = getOrders();
    const customers = getBaseData('kd_customers', sap_data.customers);
    const orderIds = sap_data.orderItems
        .filter(item => item.bookId === bookId)
        .map(item => item.orderId);
    
    return orders
        .filter(o => orderIds.includes(o.id))
        .map(o => ({
            ...o,
            customer: customers.find(c => c.id === o.customerId)
        }));
};

export const getStats = () => {
    const orders = getOrders();
    const books = getBaseData('kd_books', sap_data.books);
    const authors = getBaseData('kd_authors', sap_data.authors);
    const customers = getBaseData('kd_customers', sap_data.customers);
    const publishers = getBaseData('kd_publishers', sap_data.publishers);

    const totalCiro = sap_data.orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return {
        bookCount: books.length,
        authorCount: authors.length,
        orderCount: orders.length,
        ciro: totalCiro,
        customerCount: customers.length,
        publisherCount: publishers.length
    };
};
