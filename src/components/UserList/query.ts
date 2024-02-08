import { gql } from '@apollo/client';

export const QUERY_USERS_LIST = gql`
query ExampleQuery($userId: String!) {
    users {
        id
      }
      _service {
        sdl
      }
    user(id: $userId) {
      branch
      documentAttachment
      email
      employeeNumber
      firstName
      id
      lastName
      middleName
      modifiedBy
      modifiedOn
      password
      phoneNumber
      profile
      username
    }
  }`
;
