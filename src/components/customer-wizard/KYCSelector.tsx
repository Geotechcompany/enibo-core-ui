import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import {queryKycList} from "@/components/kyc-list/query";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/store/state";

type IndividualKYC = {
  IndividualKYCId: string;
  kycType: string;
  designation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  postalAddress: string;
  physicalAddress: string;
  country: string;
  taxNumber: string;
  idType: string;
  idNumber: string;
  sex: string;
  nationality: string;
  riskRating: string;
  attachDocumentsField: string;
  signature: string;
  modifiedBy: string;
  modifiedOn: string;
};

interface KYCSelectorProps {
  listType: string;
}

const KYCSelector: FC<KYCSelectorProps> = ({listType}) => {
  const { appState, setAppState } = useAppState();
  const { data, loading, error } = useQuery(queryKycList);
  const [selected, setSelected] = useState<IndividualKYC | undefined>();
  const [value, setValue] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  const saveData = () => {
    const inputData = {
      kycId: selected && selected.IndividualKYCId,
      createdBy: "John Doe",
      kycType: selected?.kycType,
      status: "Pending",
    };
    //check if the selected kyc is already in the state
    const isExist = appState.individuals.find(
      (individual) => individual.kycId === inputData.kycId
    );
    if (isExist) {
      setOpen(false)
      return;
    }
    //check if selected is empty
    if (!selected) {
      setOpen(false)
      return;
    }
    if(listType === "retail") {
      setAppState({
        ...appState,
        individuals: [...appState.individuals, inputData],
      });
      setOpen(false)
    } else if(listType === "business"){
      setAppState({
        ...appState,
        businesses: [...appState.businesses, inputData],
      });
      setOpen(false)
    }
    
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return <div>No data</div>;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add KYC</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select KYC</DialogTitle>
        <div>
          <Command>
            <CommandInput placeholder="Search kyc..." className="h-9" />
            <CommandEmpty>No account found.</CommandEmpty>
            <CommandGroup>
              {selected ? (
                //   filter the selected kyc
                <CommandItem>
                  <div className="">
                    <h3>
                      {
                        data.individualKYCs.find(
                          (kyc: IndividualKYC) =>
                            kyc.IndividualKYCId === selected.IndividualKYCId
                        )?.kycType
                      }
                    </h3>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === selected.IndividualKYCId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ) : (
                data.individualKYCs.map((kyc: IndividualKYC) => (
                  <CommandItem
                    key={kyc.IndividualKYCId}
                    value={kyc.IndividualKYCId}
                    onSelect={(currentValue) => {
                      console.log(kyc.IndividualKYCId);
                      setValue(currentValue);
                      setSelected(kyc);
                    }}
                  >
                    <div className="">
                      <h3>
                        {kyc.firstName} {kyc.lastName}
                      </h3>
                      <p>{kyc.kycType}</p>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === kyc.IndividualKYCId
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
              {selected && (
                <div className="mt-2 text-center">
                  <button
                    className="underline text-primary"
                    onClick={() => setSelected(undefined)}
                  >
                    Clear filters
                  </button>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button type="submit" onClick={saveData}>Save</Button>
              </div>
            </CommandGroup>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCSelector;
