/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

export const gqlError = ({ error, Toast }) => {
  if (typeof error === 'string') {
    Toast.show(error);
  } else {
    const { graphQLErrors, networkError, message } = error;
    if (graphQLErrors) {
      for (const e of graphQLErrors) {
        Toast.show({
          type: 'error',
          text1: e.message,
        });
      }
    }
    if (networkError?.result) {
      for (const e of networkError.result.errors) {
        Toast.show({
          type: 'error',
          text1: e.message,
        });
      }
    }

    if ((!graphQLErrors || (graphQLErrors && graphQLErrors.length === 0)) && !networkError?.result) {
      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  }
};
