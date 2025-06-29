import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { FaAddressBook } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateUserAddress } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal)
    );
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex items-center justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4 ">
          <FaAddressBook className="mr-2 text-2xl" />
          Add Address
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter Building Name"
            register={register}
            errors={errors}
          />
          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter City"
            register={register}
            errors={errors}
          />
          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter State"
            register={register}
            errors={errors}
          />
          <InputField
            label="Pincode"
            required
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter Pincode"
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter Street"
            register={register}
            errors={errors}
          />
          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter Country"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={btnLoader}
          className="text-white  bg-blue-600 px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners />
              Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
