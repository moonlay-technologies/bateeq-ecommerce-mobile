import React, { useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Routes from './app/navigation/Route';
import { LoadUsers, setToken } from './app/store/actions/user';
import { themeColor } from './app/store/actions';

function App({ ...props }) {
  const { options, User, LoadUsers, setToken, loading, isAuthenticated, themeColor: setThemeColor, isLogin } = props;
  const currentColor = useColorScheme();
  const [newLoad, setNewLoad] = useState(true);
  const [newToken, setNewToken] = useState(null);

  const [theme, setTheme] = useState(currentColor);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(val => {
      if (val) {
        setToken(val);
      }

      LoadUsers({
        accessToken: val,
      });

      // if (val) {
      //   setToken(val);
      //   setNewToken(val);
      // }
      // setNewLoad(false);
    });
    // }
  }, [LoadUsers, isLogin]);

  // useEffect(() => {
  //   // if (!newLoad) {
  //     LoadUsers({
  //       accessToken: options?.token,
  //     });
  //   // }
  // }, [LoadUsers, newLoad,options?.token, newToken]);

  useEffect(() => {
    const handleAppearanceChange = ({ colorScheme }) => {
      setTheme(colorScheme);
    };
    Appearance.addChangeListener(handleAppearanceChange);
    return () => {
      Appearance.removeChangeListener(handleAppearanceChange);
    };
  }, []);

  useEffect(() => {
    setThemeColor(theme);
  }, [theme]);

  return <Routes />;
}
export default connect(
  ({ Auth, User, ...state }) => {
    const { isAuthenticated, isLogin } = Auth;
    const { options, loading } = User;

    return { options, isAuthenticated, loading, User, state, isLogin };
  },
  { LoadUsers, setToken, themeColor }
)(App);
