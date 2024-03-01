import React, { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Account = {
  label: string;
  value: string;
  id: string;
  name: string;
  account_owner: string;
  account_number: string;
  account_type: string;
  bank_id: string;
  normal_balance: string;
  balances: string;
  entries: string[];
  transactions: string[];
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
};

interface AccountSelectProps {
  options: Account[];
  selected: string | null;
  placeholder: string;
  className: string;
  onChange: (selected: string | null) => void;
}

const AccountSelect: FC<AccountSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  //   const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");
  return (
    <div>
      <Command>
        <CommandInput placeholder="Search account..." className="h-9" />
        <CommandEmpty>No account found.</CommandEmpty>
        <CommandGroup>
          {selected ? (
            //   filter the selected account
            <CommandItem>
              <div className="">
                <h3>
                  {
                    options.find((account) => account.id === selected)
                      ?.account_type
                  }
                </h3>
                <p>
                  {
                    options.find((account) => account.id === selected)
                      ?.account_number
                  }
                </p>
                {
                  options.find((account) => account.id === selected)
                    ?.account_owner
                }
              </div>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === selected ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ) : (
            <div className="">
              {options.map((account) => (
                <CommandItem
                  key={account.id}
                  value={account.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    //add to selected
                    onChange(account.id);
                    console.log(selected, "");
                  }}
                >
                  <div className="">
                    <h3>{account.account_type}</h3>
                    <p>{account.account_number}</p>
                    {account.account_owner}
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === account.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </div>
          )}
          {selected && (
            <div className="mt-2 text-center">
              <button
                className="underline text-primary"
                onClick={() => onChange(null)}
              >
                Clear filters
              </button>
            </div>
          )}
        </CommandGroup>
      </Command>
    </div>
  );
};

export default AccountSelect;
