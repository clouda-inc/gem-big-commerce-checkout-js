export const updateCustomerAddress = /* GraphQL */ `
  mutation UpdateCustomerAddress(
    $address1: String
    $address2: String
    $city: String
    $company: String
    $countryCode: String
    $firstName: String
    $lastName: String
    $phone: String
    $postalCode: String
    $stateOrProvince: String
    $addressEntityId: Int!
  ) {
    customer {
      updateCustomerAddress(
        input: {
          addressEntityId: $addressEntityId
          data: {
            address1: $address1
            address2: $address2
            company: $company
            countryCode: $countryCode
            firstName: $firstName
            phone: $phone
            postalCode: $postalCode
            stateOrProvince: $stateOrProvince
            city: $city
            lastName: $lastName
          }
        }
        reCaptchaV2: { token: "" }
      ) {
        address {
          address1
          address2
          city
          company
          countryCode
          entityId
          firstName
          lastName
          phone
          postalCode
          stateOrProvince
        }
      }
    }
  }
`;
