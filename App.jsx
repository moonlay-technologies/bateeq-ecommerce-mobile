import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Routes from './app/navigations/Route';
import { LoadUsers, setToken } from './app/store/actions';

function App({ ...props }) {
  const { LoadUsers} = props;

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(val => {
          LoadUsers({
              accessToken: val,
          });
      })
  }, [LoadUsers]);
    console.log({props})
  return <Routes />;
}
export default connect(
  ({ Auth, User,...state }) => {
    const { isAuthenticated } = Auth;
    const { options, loading } = User;

    return { options, isAuthenticated, loading, User ,state};
  },
  { LoadUsers, setToken }
)(App);
