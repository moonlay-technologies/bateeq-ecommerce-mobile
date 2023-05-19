import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-auth';

class AccessApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.TOKEN);
  }
  
}

export default new AccessApi();