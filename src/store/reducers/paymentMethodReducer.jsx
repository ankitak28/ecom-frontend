import { ProductReducer } from "./ProductReducer";

const initialState = {
  paymentMethod: null,
};

export const PaymentMethodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
