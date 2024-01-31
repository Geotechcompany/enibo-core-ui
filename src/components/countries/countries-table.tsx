import { useState, useEffect } from "react";
import axios from "axios"; // Assuming you have axios installed
import { DataTable } from "../datatable/data-table";
import  { columns } from "@/components/countries/colums"
interface Country {
    id: number;
    name: string;
    code: string;
    flag: string;
    modifiedBy: string;
    modifiedOn: string;

  }

interface CountryApiResponse {
    numericCode: string;
    name: { common: string };
    alpha2Code: string;
    flags: { svg: string };
    idd: {
        root: string,
        suffixes: [string],
      },
  }

const CountriesTable = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get<CountryApiResponse[]>("https://restcountries.com/v3.1/all");
      const formattedData = response.data.map((country, index) => ({
        id: index + 1,
        name: country.name.common,
        code: country.idd.root + country.idd.suffixes,
        flag: country.flags.svg,
        modifiedBy: "-", // 
        modifiedOn: new Date().toLocaleString(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
      setCountriesData(formattedData);
    };

    fetchCountries();
  }, []);


  return (
    <DataTable data={countriesData} columns={columns} />
  );
};

export default CountriesTable;