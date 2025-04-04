import api from "../../api/api";

export const fetchProducts = () => async (dispatch) => {

    try {
        const {data} = await api.get(`/public/categories/product`);
        dispatch({
            type : "IS_FETCHING"
        });
        dispatch({
            type : 'FETCH_PRODUCTS',
            payload : data.content,
            pageNumber : data.pageNumber,
            pageSize : data.pageSize,
            totalElements : data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage
        });
        dispatch({
            type : "IS_SUCCESSFUL"
        });
        // dispatch({
        //     type : "HAS_ERROR",
        //     payload : error?.response?.data?.message
        // })
    } catch (error) {
        console.log(error);
        
    }
};