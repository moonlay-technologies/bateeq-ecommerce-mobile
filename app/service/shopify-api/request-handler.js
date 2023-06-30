import { create } from 'apisauce';
import LocalStorage from 'local-storage';
// import AuthService from '../auth/auth-service';

const api = create({
  baseURL: `https://bateeqshop.myshopify.com/admin/api/2023-04/`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': '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',
  },
});
api.axiosInstance.interceptors.request.use(
  // eslint-disable-next-line consistent-return
  config => {
    return Promise.resolve(config);
  },
  error => {
    Promise.reject(error);
  }
);
export default class RequestHandler {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this.api = api;
    this.url = url;
  }

  static defaultErrorResponse(response) {
    let msg = '';

    if (response.data) {
      if (typeof response.data === 'object') {
        msg = response.data.Error || response.data.error || 'An error has occurred';
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
        .get(url, { ...params })
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

  find(param) {
    return new Promise((resolve, reject) => {
      api
        .get(`${this.url}/${param}`, {
          state: LocalStorage.get('is_mock') ? 'mock' : 'default',
        })
        .then(response => {
          if (response.ok) resolve(response.data);
          else reject(RequestHandler.defaultErrorResponse(response));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  store(body) {
    return new Promise((resolve, reject) => {
      api
        .post(this.url, body, {
          params: {
            state: LocalStorage.get('is_mock') ? 'mock' : 'default',
          },
        })
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

  update(id, body) {
    return new Promise((resolve, reject) => {
      api
        .put(`${this.url}/${id}`, body, {
          params: {
            state: LocalStorage.get('is_mock') ? 'mock' : 'default',
          },
        })
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

  delete(id) {
    return new Promise((resolve, reject) => {
      api
        .delete(`${this.url}/${id}`, null, {
          params: {
            state: LocalStorage.get('is_mock') ? 'mock' : 'default',
          },
        })
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
}
