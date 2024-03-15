import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
mutation CreateUser($username: String!, $firstName: String!, $middleName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!, $phoneNumber: String!, $employeeNumber: String!, $branch: String!, $profile: String!, $documentAttachment: String!, $modifiedBy: String!, $modifiedOn: String!) {
  createUser(username: $username, firstName: $firstName, middleName: $middleName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword, phoneNumber: $phoneNumber, employeeNumber: $employeeNumber, branch: $branch, profile: $profile, documentAttachment: $documentAttachment, modifiedBy: $modifiedBy, modifiedOn: $modifiedOn) {
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
`;

export default SIGNUP_MUTATION;