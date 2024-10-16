import { Address } from '@bigcommerce/checkout-sdk';

import { isEqualAddress, isValidCustomerAddress } from '../address';

/* eslint-disable no-console */
export const addShippingAddress = (shippingAddress: any, addressList: any[]) => {
  console.log('[addShippingAddress] addressList : ', addressList);
  console.log('[addShippingAddress] shippingAddress : ', shippingAddress);

  const cusAddress = isValidCustomerAddress(shippingAddress, addressList, []);

  if (shippingAddress?.address1.length === 0 || shippingAddress?.city.length === 0) {
    return addressList;
  }

  let addressTemp = addressList;

  if (cusAddress) {
    console.log('[addShippingAddress] cusAddress : ', cusAddress);
    addressTemp = [
      shippingAddress,
      ...addressList.filter((address) => !isEqualAddress(address, shippingAddress)),
    ];
  } else {
    console.log('[addShippingAddress] cusAddress not found in list : ');
    addressTemp = [shippingAddress, ...addressList];
  }

  console.log('[addShippingAddress] addressTemp : ', addressTemp);

  return addressTemp;

  // const filterdAddressList = addressList.filter((address: any) => {
  //   if (
  //     address?.address1 !== shippingAddress?.address1 &&
  //     address?.city !== shippingAddress?.city &&
  //     address?.stateOrProvince !== shippingAddress?.stateOrProvince
  //   ) {
  //     return address;
  //   }
  // });

  // const shippingAddressFromList = addressList.find((address: any) => {
  //   if (address?.address1 === shippingAddress?.address1) {
  //     return address;
  //   }
  // });

  // if (!!shippingAddressFromList && isValidAddress(shippingAddressFromList, [])) {
  //   console.log('shippingAddressFromList : ', shippingAddressFromList);

  //   return [shippingAddressFromList, ...filterdAddressList];
  // }

  // const tempAddressList = [shippingAddress, ...filterdAddressList];

  // console.log('tempAddressList : ', tempAddressList);

  // return tempAddressList;
};

export const getAddressString = (address: Address) => {
  return `${address.address1}, ${
    address?.address2 && address.address2.length > 0 ? address.address2 : ''
  }, ${address.city}, ${address.stateOrProvince}, ${address.postalCode}, ${address.country}`;
};
