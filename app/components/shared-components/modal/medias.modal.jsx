import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Text, View} from "react-native";

function mapStateToProps(state) {
 return {

 };
}

/**
 * @typedef {object} MediasModalImagesType
 * @property {number} height
 * @property {number} number
 * @property {string} label
 * @property {string} value
 */

/**
 *
 * @param {object} props
 * @param { string | "multiple" | "default" } props.type
 * @param { boolean | false } props.visible
 * @param { Function } props.onClose
 * @param { MediasModalImagesType | undefined } props.initialImage
 * @param { MediasModalImagesType | MediasModalImagesType[] } props.images
 * @returns {JSX.Element}
 */
function MediasModal({ ...props})  {
	let  {
		type,
		visible,
		onClose,
		initialImage,
		images
	} = props
	
	useEffect(()=> {
	
	},[visible])
	
  return (
   <View>
	   <Text>{JSON.stringify(props,null,2)}</Text>
   </View>
  );
}

export default connect(
 mapStateToProps,
)(MediasModal);