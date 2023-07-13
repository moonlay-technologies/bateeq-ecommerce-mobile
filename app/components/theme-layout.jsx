import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarCheckoutWidget from "./shared-components/checkouts/navbar.checkout.widget";
import {View} from "react-native";

function mapStateToProps(state) {
 return {

 };
}

function ThemeLayout(props)  {
  return (
   <View>
     <NavbarCheckoutWidget/>
	   {
			 props?.children
	   }

   </View>
  );
}

export default connect(
 mapStateToProps,
)(ThemeLayout);