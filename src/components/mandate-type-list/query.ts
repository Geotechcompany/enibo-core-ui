import { gql } from "@apollo/client";


const queryMandateList = gql`
query MandateTypes {
    mandateTypes {
      mandateTypeId
      mandateTypeName
      mandateTypeDescription
      mandateTypeCode
      modifiedBy
      modifiedOn
    }
  }

`
export default queryMandateList;