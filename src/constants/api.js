// Sử dụng CORS Proxy
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://6c4f-203-210-131-23.ngrok-free.app/';

// Môi trường production (server thật)
export const PROD_API_URL = 'https://api-new-8e6b.onrender.com/';

// Môi trường development (local)
export const DEV_API_URL = 'http://localhost:8000/';

// Tự động thêm CORS proxy nếu cần
export const BASE_API_URL = process.env.NODE_ENV === 'development' 
    ? `${CORS_PROXY}${API_URL}`
    : API_URL;

export const AUTH_URL = {
    LOGIN: 'api/v1/login',
};
export const PRODUCTS = {
    LIST: `api/v1/products`,
    PRODUCT: `api/v1/admin/product/`,
    CREATE: `api/v1/admin/product/new`,
};
export const CATEGORIES = {
    LIST: `api/v1/categories`,
    CREATE: `api/v1/admin/categories/create`,
    DELETE: `api/v1/admin/categories/`,
};
export const BRANDS = {
    LIST: `api/v1/admin/brand`,
    CREATE: `api/v1/admin/brand/create`,
    DELETE: `api/v1/admin/brand/`,
};
export const SUPPLIER = {
    LIST: `api/v1/admin/supplier`,
    CREATE: `api/v1/admin/supplier/create`,
    DELETE: `api/v1/admin/supplier/`,
};
export const ORDERS = {
    LIST: `api/v1/admin/orders`,
    CREATE: `/api/v1/order/new`,
};
