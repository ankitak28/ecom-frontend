import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa6";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddresses } from "../../store/actions";

const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const dispatch = useDispatch();
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddresses(toast, selectedAddress?.addressId, setOpenDeleteModal)
    );
  };
  const noAddressExit = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  return (
    <div className="pt-4">
      {noAddressExit ? (
        <div className="p-6 rounded-lg  max-w-md mx-auto flex flex-col items-center justify-center  ">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="text-slate-900 mb-2 text-center font-semibold text-2xl">
            No Address Added Yet
          </h1>
          <p className="text-slate-800 mb-6 text-center">
            Please add your address to purchase
          </p>
          <button
            onClick={addNewAddressHandler}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md  mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>
              {address.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={addNewAddressHandler}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                  >
                    Add More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>
      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
