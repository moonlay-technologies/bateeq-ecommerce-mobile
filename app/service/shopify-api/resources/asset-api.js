import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class AssetApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.ASSETS);
  }
}

export default new AssetApi();