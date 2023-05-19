import {create} from 'apisauce';
import LocalStorage from 'local-storage';

const api = create({
  baseURL: `https://bateeqshop.myshopify.com/admin/api/2023-04/`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': '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',
  },
});

// const authenticate = async () => {
//   const response = await api.post('/graphql.json', {
//     query: `mutation {
//       exchangeApiCredentials(
//         apiKey: "${apiKey}"
//         password: "${password}"
//       ) {
//         apiVersion
//         expiresAt
//         merchantId
//         token
//       }
//     }`
//   });

//   const token = response.data.data.exchangeApiCredentials.token;
//   return token;
// };

export default class RequestHandler {
  constructor(url) {
    this.api = api;
    this.url = url;
  }

  static defaultErrorResponse(response) {
    let msg = '';

    if (response.data) {
      if (typeof response.data === 'object') {
        msg =
          response.data.Error || response.data.error || 'An error has occurred';
      } else {
        msg = response.data || 'An error has occurred';
      }
    } else {
      msg = response.originalError.message || 'An error has occurred';
    }

    return {
      code: response.problem,
      status: response.status,
      message: msg,
    };
  }

  get(params, url = this.url) {
    return new Promise((resolve, reject) => {
      api
        .get(url, {...params})
        .then(response => {
          if (response.ok) resolve(response.data);
          else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getDataAccount(customerId, params, url = this.url) {
    return new Promise((resolve, reject) => {
      api
        .get(`${url}/${customerId}.json`, {...params})
        .then(response => {
          if (response.ok) resolve(response.data);
          else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  update(customerId, body, url = this.url) {
    return new Promise((resolve, reject) => {
      api
        .put(`${url}/${customerId}.json`, body)
        .then(response => {
          if (response.ok) resolve(response.data);
          else {
            reject(RequestHandler.defaultErrorResponse(response));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  store(body) {
    return new Promise((resolve, reject) => {
      api
        .post(`${this.url}.json`, body, {
          params: {
            state: LocalStorage.get('is_mock') ? 'mock' : 'default',
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(RequestHandler.defaultErrorResponse(error));
        });
    });
  }
}
