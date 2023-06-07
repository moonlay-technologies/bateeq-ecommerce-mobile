import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthenApi, ProfileApi} from '../api-login';


// const login = ({username, password}) => {
//   return new Promise((resolve, reject) => {
//     AuthenApi.store({username, password})
//       .then(r => {
//         setToken(r.token);
//         resolve(r);
//       })
//       .catch(e => {
//         reject(e);
//       });
//   });
// };

// const profile = async () => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     const r = await ProfileApi.detail(token);
//     setUser(r);
//     return r;
//   } catch (e) {
//     // setUser({
//     //   id: 1,
//     //   email: 'arbomb',
//     //   full_name: 'ardy',
//     //   roles: [{ name: 'CENTRAL_SUPERVISOR' }],
//     // });
//     throw e;
//   }
// };

const setUser = async user => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.log('Error storing user: ', e);
  }
};

const getUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    console.log('Error retrieving user: ', e);
    return null;
  }
};

const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('token');
  const user = await AsyncStorage.getItem('user');
  return token !== null && user !== null;
};

const setToken = async token => {
  console.log("token authservice", token)
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    console.log('Error storing token: ', e);
  }
};

const getToken = () => {
  return new Promise((resolve, reject) => {
     AsyncStorage.getItem('accessToken')
      .then(result=>{
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.log('Error removing data: ', e);
  }
};

const AuthService = {
  // login,
  // profile,
  setUser,
  getUser,
  isLoggedIn,
  setToken,
  getToken,
  logout,
};

export default AuthService;
