import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Routes from './app/navigations/Route';
import { LoadUsers, setToken } from './app/store/actions/user';

function App({ ...props }) {
  const { options,User, LoadUsers, setToken, loading, isAuthenticated } = props;
  const [newLoad, setNewLoad] = useState(true);
  const [newToken, setNewToken] = useState(null);



  useEffect(() => {
    setNewLoad(true);
    AsyncStorage.getItem('accessToken')
      .then(val => {
        if (val) {
          setToken(val);
          setNewToken(val);
        }
        setNewLoad(false);
      })
      .catch(err => {
        setNewLoad(false);
      });
  }, []);

  useEffect(() => {
    if (!newLoad) {
      LoadUsers({
        accessToken: options?.token,
      });
    }
  }, [ LoadUsers,newLoad, newToken]);

    console.log({User})
  return <Routes />;
}
export default connect(
  ({ Auth, User }) => {
    const { isAuthenticated } = Auth;
    const { options, loading } = User;
    return { options, isAuthenticated, loading,User };
  },
  { LoadUsers, setToken }
)(App);
