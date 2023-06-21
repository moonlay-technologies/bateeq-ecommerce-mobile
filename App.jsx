import React, { useEffect, useState } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import Routes from './app/navigations/Route';
import { LoadUsers, setToken } from './app/store/actions/user';
import { themeColor } from './app/store/actions';

function App({ ...props }) {
  const { options, User, LoadUsers, setToken, loading, isAuthenticated, themeColor: setThemeColor } = props;
  const currentColor = useColorScheme();
  const [newLoad, setNewLoad] = useState(true);
  const [newToken, setNewToken] = useState(null);
  const [theme, setTheme] = useState(currentColor);

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
  }, [LoadUsers, newLoad, newToken]);

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
  ({ Auth, User }) => {
    const { isAuthenticated } = Auth;
    const { options, loading } = User;

    return { options, isAuthenticated, loading, User };
  },
  { LoadUsers, setToken, themeColor }
)(App);
