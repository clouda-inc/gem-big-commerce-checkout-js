import { CustomerAddress } from '@bigcommerce/checkout-sdk';

import { isEqualAddress } from '../address';

export default function shiftGivenAddressToTop<Address>(
  array: CustomerAddress[],
  given: CustomerAddress,
): Address[] {
  const filterdArray = array.filter(
    (item) => !isEqualAddress(item as CustomerAddress, given as CustomerAddress),
  );

  const isValid =
    given.firstName !== '' &&
    given?.firstName.length > 0 &&
    given?.lastName !== '' &&
    given?.lastName.length > 0 &&
    given?.company !== '' &&
    given?.company.length > 0 &&
    given?.address1 !== '' &&
    given?.address1.length > 0 &&
    given?.city !== '' &&
    given?.city.length > 0;

  if (!isValid) {
    return array as Address[];
  }

  return [given, ...filterdArray] as Address[];
}
