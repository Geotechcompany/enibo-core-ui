import { gql } from "@apollo/client";

const SIGNUP_MUTATION = gql`
mutation SignUp(
  $email: String!
  $password: String!
  $confirmPassword: String!
  $username: String!
  $firstName: String!
  $middleName: String!
  $lastName: String!
  $phoneNumber: String!
  $employeeNumber: String!
  $branch: String!
  $profile: String!
  $documentAttachment: String!
  $modifiedBy: String!
  $modifiedOn: String!
) {
  createUser(
    email: $email
    password: $password
    confirmPassword: $confirmPassword
    username: $username
    firstName: $firstName
    middleName: $middleName
    lastName: $lastName
    phoneNumber: $phoneNumber
    employeeNumber: $employeeNumber
    branch: $branch
    profile: $profile
    documentAttachment: $documentAttachment
    modifiedBy: $modifiedBy
    modifiedOn: $modifiedOn
  ) {
    id
    email
    username
    firstName
    middleName
    lastName
    phoneNumber
    employeeNumber
    branch
    profile
    documentAttachment
    modifiedBy
    modifiedOn
  }
}
`;

export default SIGNUP_MUTATION;