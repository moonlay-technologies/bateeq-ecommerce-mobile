import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-auth';

class AuthenApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.AUTHEN);
  }
  
}

export default new AuthenApi();