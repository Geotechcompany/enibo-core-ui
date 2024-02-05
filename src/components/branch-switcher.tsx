"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const groups = [
  {
    label: "Main Branch",
    branches: [
      {
        label: "Nairobi Branch",
        value: "nairobi-branch",
      },
    ],
  },
  {
    label: "Branches",
    branches: [
      {
        label: "Nyeri Branch.",
        value: "nyeri-branch",
      },
      {
        label: "Mombasa Branch.",
        value: "mombasa-branch",
      },
    ],
  },
];``

type Branch = (typeof groups)[number]["branches"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<Branch>(
    groups[0].branches[0]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="bg-[#F91B19]">
        <Button
          
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between hover:bg-[#EB001B] hover:text-white border-2 border-gray-300 dark:bg-[#BF0000] dark:hover:bg-[#EB001B]", className)}
        >
          <Avatar className="w-5 h-5 mr-2">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedBranch.value}.png`}
              alt={selectedBranch.label}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedBranch.label}
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search branch..." />
            <CommandEmpty>No branch found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.branches.map((branch) => (
                  <CommandItem
                    key={branch.value}
                    onSelect={() => {
                        setSelectedBranch(branch);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="w-5 h-5 mr-2">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${branch.value}.png`}
                        alt={branch.label}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {branch.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedBranch.value === branch.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
