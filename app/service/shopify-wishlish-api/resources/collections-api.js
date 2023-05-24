import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class CollectionsApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.COLLECTIONS);
  }
}

export default new CollectionsApi();
