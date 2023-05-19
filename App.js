import React from 'react';
import Routes from './app/Navigations/Route';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenAccess');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log('Error retrieving authentication token:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <>
        <Routes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
};

export default App;
