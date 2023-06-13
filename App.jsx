import React, {useEffect, useRef, useState} from 'react';
import Routes from './app/navigations/Route';
import {Animated} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connect} from "react-redux";
import {LoadUsers, setToken} from "./app/store/actions/user";

function App({ ...props }) {
  let { options,LoadUsers,setToken,loading, isAuthenticated } = props
  const [newLoad,setNewLoad] = useState(true)
  const [newToken, setNewToken] = useState(null);

  useEffect(()=> {
    setNewLoad(true)
    AsyncStorage.getItem('accessToken')
        .then(val => {
          if(val){
            setToken(val)
            setNewToken(val)
          }
          setNewLoad(false)
        })
        .catch((err)=> {
          setNewLoad(false)
        })
  },[setToken])


  useEffect(()=> {
    if(!newLoad){
      LoadUsers({
        accessToken: newToken
      })
    }
  },[LoadUsers,newLoad,newToken])

  return <Routes />;
}
export default connect(({Auth,User})=> {
  let { isAuthenticated } = Auth
  let { options,loading } = User
  return {options ,isAuthenticated,loading }
},{LoadUsers,setToken})(App)
