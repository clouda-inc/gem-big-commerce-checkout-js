
import { Address } from '@bigcommerce/checkout-sdk';

import { isEqualAddress } from '../address';

export default function shiftGivenAddressToTop<T>(array: T[], given: T): T[] {
  const filterdArray = array.filter((item) => !isEqualAddress(item as Address, given as Address));

  return [given, ...filterdArray];
}
