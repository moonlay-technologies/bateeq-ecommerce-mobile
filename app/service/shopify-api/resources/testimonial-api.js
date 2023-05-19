import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class TestimonialApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.TESTIMONIALS);
  }
}

export default new TestimonialApi();
