import { Button, MenuItem, Select } from "@headlessui/react";
import { FormControl, InputLabel, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiArrowUp, FiRefreshCcw, FiSearch } from "react-icons/fi";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

//http://localhost:xxxx?keyword=television&sortby=desc
// Make sure the url is updated with filter values
// Use this filter values for getting data from the backend

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortBy") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${params}`);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [searchParams, searchTerm, navigate, pathname]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
      navigate(`${pathname}?${params}`);
      setCategory(event.target.value);
    }
  };
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  };
  const handleClearFilters = () => {
    navigate({ pathname: window.location.pathname }); //returns URI and clears all the query string after the pathname
  };
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* SEARCH BAR */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px]">
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={20}" />
      </div>
      {/* CATEGORY SELECTION */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl
          className="text-slate-800 border-slate-700"
          variant="outlined"
          size="small"
        >
          {/* <InputLabel id="category-select">Category</InputLabel> */}
          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <option value="all">All</option>
            {categories.map((items) => (
              <option key={items.categoryId} value={items.categoryName}>
                {items.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>
        {/* SORT BUTTON & CLEAR FILTERs */}
        <Tooltip title="sorted by price:asc">
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            color="primary"
            className="flex items-center gap-2 h-10 "
          >
            SORT BY
            {sortOrder === "asc" ? (
              <FiArrowUp size={20} />
            ) : (
              <FiArrowDown size={20} />
            )}
          </Button>
        </Tooltip>
        <button
          className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"
          onClick={handleClearFilters}
        >
          <FiRefreshCcw className="font-semibold" size={16} />
          <span className="font-semibold">Clear Filter</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
