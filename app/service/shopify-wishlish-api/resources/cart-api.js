import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class CartApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.CART);
  }
}

export default new CartApi();