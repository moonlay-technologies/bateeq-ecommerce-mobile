import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class CountApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.COUNT);
  }
}

export default new CountApi();
