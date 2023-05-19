import {create} from 'apisauce';

const api = create({
  baseURL: `https://bateeqshop.myshopify.com/admin/api/2023-04/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': 'your_access_token_here',
  },
});

const query = `
{
  shop {
    testimonials(first: 10) {
      edges {
        node {
          id
          author
          quote
          rating
        }
      }
    }
  }
}
`;

const getTestimonials = () => {
  return api
    .post('/', {query})
    .then(response => {
      if (response.ok) {
        return response.data;
      } else {
        throw new Error(response.problem);
      }
    })
    .catch(error => {
      throw error;
    });
};

export default {
  getTestimonials,
};
