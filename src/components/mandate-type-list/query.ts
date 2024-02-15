import { gql } from "@apollo/client";


const queryMandateList = gql`
query MandateTypes {
    mandateTypes {
      mandateTypeName
      mandateTypeDescription
      mandateTypeCode
      modifiedBy
      modifiedOn
    }
  }

`
export default queryMandateList;