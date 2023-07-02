import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import {
  GET_PROD_BY_ID,
  GET_PROD_COLL_LATEST,
  GET_PROD_COLL_LATEST_SHOW,
  GET_PROD_COLL_OUR_CATEGORY,
  GET_PROD_COLL_SEARCH,
  GET_PROD_RECOMMENDATION_BY_PROD_ID,
} from '../constants/product';

const initialState = {
  show: {
    loading: true,
    data: null,
  },
  collections: {
    search: {
      loading: false,
      query: '',
      data: [],
    },
    ourCategory: {
      loading: true,
      variables: {
        first: 5,
        query: 'categories',
        after: null,
      },
      pagination: {},
      data: [],
    },
    latest: {
      show: {
        loading: true,
        variables: {
          first: 1,
          handle: 'kamala-collections',
          product_filters: {
            available: true,
          },
        },
        data: null,
      },

      loading: true,
      variables: {
        first: 5,
        handle: 'kamala-collections',
        after: null,
        product_filters: {
          available: true,
        },
      },
      pagination: {},
      data: [],
      collection: {}
    },
    detail: {
      loading: true,
      data: {},
    },
    recommendations: {
      loading: true,
      data: [],
    },
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // get product collection
    case REQUEST(GET_PROD_COLL_SEARCH):
      return {
        ...state,
        collections: {
          ...state.collections,
          search: {
            ...state.collections.search,
            query: action?.payload?.query ?? '',
            loading: true,
            data: [],
          },
        },
      };
    case SUCCESS(GET_PROD_COLL_SEARCH):
      return {
        ...state,
        collections: {
          ...state.collections,
          search: {
            ...state.collections.search,
            loading: false,
            query: payload?.query ?? '',
            data: [...payload?.data],
          },
        },
      };
    case FAILURE(GET_PROD_COLL_SEARCH):
      return {
        ...state,
        collections: {
          ...state.collections,
          search: {
            ...state.collections.search,
            loading: false,
            query: payload?.query ?? state.collections.search.query ?? '',
            data: [],
          },
        },
      };

    // get product collection category
    case REQUEST(GET_PROD_COLL_OUR_CATEGORY):
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading: true,
            data: [],
          },
        },
      };
    case SUCCESS(GET_PROD_COLL_OUR_CATEGORY):
      if (payload?.data && Array.isArray(payload?.data) && payload?.data.length > 0) {
        state.collections.ourCategory.data = payload.data.map(child => ({
          ...child,
          loading: false,
        }));
      }
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading: false,
            data: [...state.collections.ourCategory.data],
          },
        },
      };
    case FAILURE(GET_PROD_COLL_OUR_CATEGORY):
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading: false,
            data: [],
          },
        },
      };
    //  get product collection lates
    case REQUEST(GET_PROD_COLL_LATEST):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading: true,
            data: [],
            collection: {}
          },
        },
      };
    case SUCCESS(GET_PROD_COLL_LATEST):
      if (payload?.data && Array.isArray(payload?.data) && payload?.data.length > 0) {
        state.collections.latest.data = payload.data.map(child => ({
          ...child,
          loading: false,
        }));
      }
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading: false,
            data: [...state.collections.latest.data],
            collection: payload?.collection
          },
        },
      };
    case FAILURE(GET_PROD_COLL_LATEST):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading: false,
            data: [],
          },
        },
      };

    //  get product collection latest show
    case REQUEST(GET_PROD_COLL_LATEST_SHOW):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            show: {
              ...state.collections.latest.show,
              loading: true,
              data: null,
            },
          },
        },
      };
    case SUCCESS(GET_PROD_COLL_LATEST_SHOW):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            show: {
              ...state.collections.latest.show,
              loading: false,
              data: payload?.data ?? null,
            },
          },
        },
      };
    case FAILURE(GET_PROD_COLL_LATEST_SHOW):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            show: {
              ...state.collections.latest.show,
              loading: false,
              data: null,
            },
          },
        },
      };

    // get product detail by id
    case REQUEST(GET_PROD_BY_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          detail: {
            loading: true,
            data: {},
          },
        },
      };
    case SUCCESS(GET_PROD_BY_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          detail: {
            ...state.collections.detail,
            loading: false,
            data: payload,
          },
        },
      };
    case FAILURE(GET_PROD_BY_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          detail: {
            loading: false,
            data: {},
          },
        },
      };

    // get product recomendation by product id
    case REQUEST(GET_PROD_RECOMMENDATION_BY_PROD_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          recommendations: {
            loading: true,
            data: [],
          },
        },
      };
    case SUCCESS(GET_PROD_RECOMMENDATION_BY_PROD_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          recommendations: {
            loading: false,
            data: payload,
          },
        },
      };
    case FAILURE(GET_PROD_RECOMMENDATION_BY_PROD_ID):
      return {
        ...state,
        collections: {
          ...state.collections,
          recommendations: {
            loading: false,
            data: [],
          },
        },
      };
    default:
      return state;
  }
}
