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
    profile {
      id
      name
      description
      permissions
      modifiedBy
      modifiedOn
    }
    documentAttachment
    modifiedBy
    modifiedOn
  }
}
`

  export default queryUsersList;