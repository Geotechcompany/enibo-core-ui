import { FC } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface DeleteWarningProps {
  handleDeletion: () => void;
}

const DeleteWarning: FC<DeleteWarningProps> = ({ handleDeletion }) => {
  
  return (
    <div className="text-black">
      <div className="text-lg">Confirm deletion of selected record/s</div>
      <div className="flex justify-end mt-4">
        <Button
          size={"sm"}
          variant={"outline"}
          className="text-[#253285] border-[#253285] font-bold py-1 px-4 rounder mr-2"
          onClick={() => {
            window.location.reload();
            toast({}).dismiss();
          }}
        >
          Cancel
        </Button>
        <Button
          size={"sm"}
          className="px-4 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleDeletion}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteWarning;
