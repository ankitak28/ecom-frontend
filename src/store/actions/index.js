import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {

    try {
        const { data } = await api.get(`/public/categories/product?${queryString}`);
        dispatch({
            type: "IS_FETCHING"
        });
        dispatch({
            type: 'FETCH_PRODUCTS',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({
            type: "IS_SUCCESS"
        });
        dispatch({
            type: "HAS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products."
        })
    } catch (error) {
        console.log(error);

    }
};

export const fetchCategories = (queryString) => async (dispatch) => {

    try {
        dispatch({
            type: "CATEGORY_LOADER"
        });
        const { data } = await api.get(`/public/categories`);

        dispatch({
            type: 'FETCH_CATEGORIES',
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({
            type: "IS_ERROR"
        });
        dispatch({
            type: "HAS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories."
        })
    } catch (error) {
        console.log(error);

    }
};

export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        //Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        //check the stock
        const isQuantityExist = getProduct.quantity >= qty;
        //If in stock add product
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            //error
            toast.error("Out of stock!");
        }
        //If not throw error
    }