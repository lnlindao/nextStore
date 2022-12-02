import { createContext, useReducer } from "react";
import { CartItem } from "src/interfaces/Cart";

export const Store = createContext(null);

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state: any, action: any) {
  console.log("action.payload", action.payload.id);
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      const newItem = action.payload;

      const itemExists = state.cart.cartItems.find((item: CartItem) => {
        return item.id === newItem.id;
      });

      const cartItems = itemExists
        ? state.cart.cartItems.map((item: CartItem) =>
            item.id === itemExists.id
              ? { ...item, quantity: item.quantity++ }
              : item
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "REMOVE_ITEM_FROM_CART": {
      console.log("id to remove", action.payload, state.cart.cartItems);
      const cartItems = state.cart.cartItems.filter(
        (product: CartItem) => product.id !== action.payload
      );
      console.log("removed", cartItems);
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = { state, dispatch };
  return <Store.Provider value={data}>{children}</Store.Provider>;
}
