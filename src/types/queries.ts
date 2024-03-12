import { gql } from "@apollo/client";

export const querySettingsList = gql`
query Settings {
  settings {
    id
    name
    value
    description
    hidden
    modifiedBy
    modifiedOn
    createdAt
    updatedAt
  }
}
`
export const querySetting = gql`
query Setting($settingId: String) {
  setting(id: $settingId) {
    id
    name
    value
    description
    hidden
    modifiedBy
    modifiedOn
    createdAt
    updatedAt
  }
}
`

export const queryUserProfiles = gql`
query Profiles {
  profiles {
    id
    name
    description
    permissions
    modifiedBy
    modifiedOn
  }
}
`

export const queryUserProfile = gql`
query Profile($profileId: String!) {
  profile(id: $profileId) {
    id
    name
    description
    permissions
    modifiedBy
    modifiedOn
  }
}
`

export const queryUser = gql`
query User($userId: String!) {
  user(id: $userId) {
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