import { Skeleton, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import ErrorPage from "../shared/ErrorPage";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state) => state.payment);
  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding.");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select payment method before proceeding.");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="py-14 min-h-[calc(100v-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Skeleton />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <PaymentMethod />}
          {activeStep === 2 && <OrderSummary />}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-100 "
        style={{ boxShadow: "0 -2px 4px rgba(100,100,100,0.15)" }}
      >
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                ? !paymentMethod
                : false)
            }
            className={`bg-blue-600 font-semibold px-6 h-10 rounded-md text-white
              ${
                errorMessage ||
                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                (activeStep === 1 && !paymentMethod)
                  ? "opacity-60"
                  : ""
              }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
