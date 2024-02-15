import { gql } from "@apollo/client";

const queryUsersList = gql`
query Users {
    users {
      id
      username
      firstName
      middleName
      lastName
      email
      password
      confirmPassword
      phoneNumber
      employeeNumber
      branch
      profile
      documentAttachment
      modifiedBy
      modifiedOn
    }
  }`

  export default queryUsersList;