import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-properties';

class CountriesApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.COUNTRIES);
  }

  getProvinceByCountryId(params) {
    return new Promise((resolve, reject) => {
      this.find(`${params}/${ENDPOINT.PROVINCES}.json`)
        .then(result => {
          console.log('result countries api', result);
          resolve(result);
        })
        .catch(error => reject(error));
    });
  }
}

export default new CountriesApi();
