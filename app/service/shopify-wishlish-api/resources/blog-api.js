import RequestHandler from '../request-handler';
import ENDPOINT from '../../../config/api-master';

class BlogApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.BLOG);
  }

  getListBlog(params) {
    return new Promise((resolve, reject) => {
      this.get(params, `${this.url}.json`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getArticleBlog(blog_id, params = {}) {
    return new Promise((resolve, reject) => {
      this.get(params, `${this.url}/${encodeURIComponent(blog_id)}/articles.json`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new BlogApi();
