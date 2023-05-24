import React from 'react';
import Routes from './app/Navigations/Route';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);
      } catch (error) {
        console.log('Error reading access token from AsyncStorage:', error);
      }
    };

    checkAccessToken();
  }, []);

  return (
    <>
        <Routes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default App;
