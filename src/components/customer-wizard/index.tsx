import { FC } from "react";
import Stepper from "./stepper";
import { Route, Routes } from "react-router-dom";
import CustomerKYC from "./CustomerKYC";
import Products from "./Products";
import CustomerMandates from "./CustomerMandates";
import CustomerMandateRules from "./CustomerMandateRules";

interface WizardProps {}

const Wizard: FC<WizardProps> = () => {
  return (
    <div className="flex gap-4 mx-4 my-8">
      <div className="w-[10%]">
        <Stepper />
      </div>
      <div className="w-[90%]">
        <Routes>
          <Route path="/" element={<CustomerKYC />} />
          <Route path="/products" element={<Products />} />
          <Route path="/mandates" element={<CustomerMandates />} />
          <Route path="/mandate-rules" element={<CustomerMandateRules />} />
        </Routes>
      </div>
    </div>
  );
};

export default Wizard;
