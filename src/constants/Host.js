const host = '192.168.1.14';
const port = '8080';
const url = `http://${host}:${port}/api/v1`;

const AUTH_URL = `${url}/auth`;
const USER_URL = `${url}/users`;
const PRODUCT_URL = `${url}/products`;
const CATEGORY_URL = `${url}/categories`;
const ADDRESS_URL = `${url}/addresses`;
const CART_URL = `${url}/cart`;

export const TEST_CONNECTION_URL = `${url}/test-connection`;

export const LOGIN_URL = `${AUTH_URL}/login`;
export const REGISTER_URL = `${AUTH_URL}/register`;
export const LOAD_USER_URL = `${AUTH_URL}/loadUser`;

export const UPDATE_USER_URL = `${USER_URL}/update`;

export const FETCH_ADDRESSES_URL = `${ADDRESS_URL}/user-addresses`;
export const CREATE_ADDRESS_URL = `${ADDRESS_URL}/create`;
export const UPDATE_ADDRESS_URL = `${ADDRESS_URL}/update`;
export const DELETE_ADDRESS_URL = `${ADDRESS_URL}/delete`;

export const FETCH_CATEGORIES_URL = `${CATEGORY_URL}`;

export const FETCH_PRODUCTS_URL = `${PRODUCT_URL}`;

export const FETCH_CART_URL = `${CART_URL}`;
export const UPDATE_CART_URL = `${CART_URL}/update`;
export const DELETE_CART_URL = `${CART_URL}/delete`;
