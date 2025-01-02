import { Address } from '@bigcommerce/checkout-sdk';

export const addShippingAddress = (shippingAddress: any, addressList: any[]) => {
  if (shippingAddress?.address1.length === 0 || shippingAddress?.city.length === 0) {
    return addressList;
  }

  const similarAddress = addressList.find((address: any) => {
    if (getAddressString(address) === getAddressString(shippingAddress)) {
      return address;
    }
  });

  let addressTemp = addressList;

  if (similarAddress) {
    addressTemp = [
      similarAddress,
      ...addressList.filter(
        (address: any) => JSON.stringify(address) !== JSON.stringify(similarAddress),
      ),
    ];
  } else {
    addressTemp = [shippingAddress, ...addressList];
  }

  return addressTemp;
};

export const getAddressString = (address: Address) => {
  return `${address?.firstName} ${address?.lastName} ${address.address1} ${address.address2} ${address.city} ${address.stateOrProvince} ${address.countryCode} ${address.postalCode}`;
};

export const compareAddress = (address1: string, address2: string) => {
  return address1 === address2;
};
