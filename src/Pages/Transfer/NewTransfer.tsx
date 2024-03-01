import { NewTransferForm } from "@/components/new-transfer-form";
import { FC } from "react";

interface NewTransferProps {}

const NewTransfer: FC<NewTransferProps> = () => {
  return (
    <div className="h-screen p-4">
      <NewTransferForm />
    </div>
  );
};

export default NewTransfer;
