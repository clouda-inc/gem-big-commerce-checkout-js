/* eslint-disable no-console */
import { Address } from '@bigcommerce/checkout-sdk';

import { isEqualAddress } from '../address';

export default function shiftGivenAddressToTop<T>(array: T[], given: T): T[] {
  const index = array.indexOf(given);

  const indexOf = array.findIndex((item) => isEqualAddress(item as Address, given as Address));

  console.log('Index ', index);
  console.log('indexOf ', indexOf);

  // const givenArrayMatch = array[indexOf - 1];
  // const restOfArray = array.filter(
  //   (item) => !isEqualAddress(item as Address, givenArrayMatch as Address),
  // );

  // const resultAddressList = [...array.slice(0, indexOf - 1), ...array.slice(indexOf - 1, indexOf)];

  return array;
}
