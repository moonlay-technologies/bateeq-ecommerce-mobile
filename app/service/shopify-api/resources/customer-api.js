import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class CustomerApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.CUSTOMERS);
  }

  getAddressByCustomerAndAddressId(params) {
    const { customerId, addressId } = params;

    return new Promise((resolve, reject) => {
      this.find(`${customerId}/${ENDPOINT.ADDRESSES}/${addressId}.json`)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new CustomerApi();
