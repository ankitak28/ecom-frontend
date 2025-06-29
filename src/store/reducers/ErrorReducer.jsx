import { ProductReducer } from "./ProductReducer";

const initialState = {
  isLoading: false,
  errorMsg: "",
  categoryLoader: false,
  categoryError: null,
  btnLoader: false,
};

export const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        btnLoader: false,
        categoryError: null,
        categoryLoader: false,
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: true,
        errorMsg: action.payload,
        btnLoader: false,
        categoryLoader: false,
      };
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        categoryError: null,
      };
    case "CATEGORY_LOADER":
      return {
        ...state,
        categoryLoader: true,
        categoryError: null,
        errorMsg: null,
      };

    case "BUTTON_LOADER":
      return {
        ...state,
        btnLoader: true,
        categoryError: null,
        errorMsg: null,
      };
    default:
      state;
  }
  return state;
};
