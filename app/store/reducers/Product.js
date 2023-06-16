import { FAILURE, REQUEST, SUCCESS } from '../actions/action.type';
import {
  GET_PROD_COLL_LATEST,
  GET_PROD_COLL_LATEST_SHOW,
  GET_PROD_COLL_OUR_CATEGORY,
  GET_PROD_COLL_SEARCH
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
        loading:true,
        variables: {
          handle:'latest-collection'
        },
        data: null,
      },

      loading: true,
      variables: {
        first: 5,
        query: 'categories',
        after: null,
      },
      pagination: {},
      data: [],
    },
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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

    case REQUEST(GET_PROD_COLL_OUR_CATEGORY):
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading:true,
            data: []
          }
        }
      }
    case SUCCESS(GET_PROD_COLL_OUR_CATEGORY):
      if(payload?.data && Array.isArray(payload?.data) && payload?.data.length > 0){
        state.collections.ourCategory.data = payload.data.map((child)=> ({
          ...child,
          loading: false,
        }))

      }
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading:false,
            data: [...state.collections.ourCategory.data]
          }
        }
      }
    case FAILURE(GET_PROD_COLL_OUR_CATEGORY):
      return {
        ...state,
        collections: {
          ...state.collections,
          ourCategory: {
            ...state.collections.ourCategory,
            loading:false,
            data: []
          }
        }
      }

    case REQUEST(GET_PROD_COLL_LATEST):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading:true,
            data: []
          }
        }
      }
    case SUCCESS(GET_PROD_COLL_LATEST):
      if(payload?.data && Array.isArray(payload?.data) && payload?.data.length > 0){
        state.collections.latest.data = payload.data.map((child)=> ({
          ...child,
          loading: false,
        }))

      }
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading:false,
            data: [...state.collections.latest.data]
          }
        }
      }
    case FAILURE(GET_PROD_COLL_LATEST):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            loading:false,
            data: []
          }
        }
      }

    case REQUEST(GET_PROD_COLL_LATEST_SHOW):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            show: {
              ...state.collections.latest.show,
              loading:true,
              data: null
            }
          }
        }
      }
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
              data: payload?.data ?? null
            }
          }
        }
      }
    case FAILURE(GET_PROD_COLL_LATEST_SHOW):
      return {
        ...state,
        collections: {
          ...state.collections,
          latest: {
            ...state.collections.latest,
            show: {
              ...state.collections.latest.show,
              loading:false,
              data: null
            }
          }
        }
      }

    default:
      return state;
  }
}
