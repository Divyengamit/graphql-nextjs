import { gql } from "@apollo/client";

export const CUSTOMER_REGISTRATION_STEP1 = gql`
  mutation CustomerRegistrationStep1(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $mobileNo: String!
    $dob: String!
    $termConditionConsent: Boolean!
  ) {
    createUserStepBasicInfo(
      createUserStepInput: {
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        mobileNo: $mobileNo
        dob: $dob
        termConditionConsent: $termConditionConsent
      }
    ) {
      status
      requestId
    }
  }
`;
