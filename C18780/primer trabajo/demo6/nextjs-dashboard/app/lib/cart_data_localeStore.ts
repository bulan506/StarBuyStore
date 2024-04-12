import { Cart } from './products-data-definitions';

export function saveInitialCartLocalStorage(cart: Cart): void {
  const dataAsString = JSON.stringify(cart);
  localStorage.setItem('initialCart', dataAsString);
}

export function getInitialCartLocalStorage(): Cart {
  const dataAsString = localStorage.getItem('initialCart');
  if (dataAsString) {
    return JSON.parse(dataAsString);
  } else {
    const cart: Cart = {
      cart: {
        products: [],
        subtotal: 0,
        taxPercentage: 0,
        total: 0,
        deliveryAddress: "",
        methodPayment: null
      },
      taxPercentage: 0,//borrar
    }
     return cart;
  }
}
