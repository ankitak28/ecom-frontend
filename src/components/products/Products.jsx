import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Paginations from "../shared/Paginations";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  // const isLoading = false;
  // const errorMessage = ""; // Error fetching proucts
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
  useProductFilter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // const products = [
  //   {
  //         productId: 652,
  //         productName: "Iphone Xs max",
  //         image: "https://placehold.co/600x400",
  //         description: "Experience the latest in mobile technology with advanced cameras, powerful processing, and an all-day battery.",
  //         quantity: 10,
  //         price: 1450.0,
  //         discount: 10.0,
  //         specialPrice: 1305.0,
  //       },
  //       {
  //         productId: 654,
  //         productName: "MacBook Air M2s",
  //         image: "https://placehold.co/600x400",
  //         description: "Ultra-thin laptop with Apple's M2 chip, providing fast performance in a lightweight, portable design.",
  //         quantity: 0,
  //         price: 2550.0,
  //         discount: 20.0,
  //         specialPrice: 2040.0,
  //       }
  //   ];

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto ">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <p>It is loading...</p>
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamation className="text-slate-800 text-3xl mr-2 " />

          <span className="text-slate-800 text-3xl mr-2 ">{errorMessage}</span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((product, productId) => (
                <ProductCard key={productId} {...product} />
              ))}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
