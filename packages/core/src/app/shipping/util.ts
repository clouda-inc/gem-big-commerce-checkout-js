export const addShippingAddress = (shippingAddress: any, addressList: any[]) => {
  const filterdAddressList = addressList.filter((address: any) => {
    if (address?.address1 !== shippingAddress?.address1) {
      return address;
    }
  });

  const tempAddressList = [shippingAddress, ...filterdAddressList];

  return tempAddressList;
};
