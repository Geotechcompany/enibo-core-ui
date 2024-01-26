import axios from "axios";
import { useState, useEffect } from "react";
import { DataTable } from "../datatable/data-table";
import { currenciesColumns } from "./columns";


interface Currency {
    id: number;
    currencyCode: string;
    currencyDescription: string;
    country: string;
    modifiedBy: string;
    modifiedOn: string;
  }
  
  interface CurrencyApiResponse {
    numericCode: string;
    name: { common: string };
    alpha2Code: string;
    flags: { svg: string };
    idd: {
      root: string;
      suffixes: [string];
    };
    symbol: string;
    currencies: { [key: string]: { name: string; symbol: string } };
  }
  
  const CurrenciesTable = () => {
    const [currenciesData, setCurrenciesData] = useState<Currency[]>([]);
  
    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const response = await axios.get<CurrencyApiResponse[]>(
            "https://restcountries.com/v3.1/all"
          );
  
          const formattedData = response.data.map((currency, index) => ({
            
            id: index + 1,
            currencyCode: currency.idd.root + currency.idd.suffixes,
            currencyDescription:  "",
            country: currency.name.common,
            modifiedBy: "-",
            modifiedOn: new Date().toLocaleString(),
          }));
  
          setCurrenciesData(formattedData);
        } catch (error) {
          console.error("Error fetching currencies:", error);
        }
      };
  
      fetchCurrencies();
    }, []);
  
  
    return <DataTable data={currenciesData} columns={currenciesColumns} />;
  };
  
  export default CurrenciesTable;