import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Text, useWindowDimensions, View} from "react-native";
import {ClosePreviewProduct} from "../../../store/actions";
import ImageView from "react-native-image-viewing";

function mapStateToProps({_Modal}) {
	let { preview } = _Modal
	let { product } = preview
	return {
		...product
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
 * @param { MediasModalImagesType | null | undefined } props.initialImage
 * @param { MediasModalImagesType | MediasModalImagesType[] | [] } props.images
 * @returns {JSX.Element}
 */
function MediasModal(props)  {
	let  {
		type,
		visible,
		initialImage,
		ClosePreviewProduct,
		images = []
	} = props
	
	const screen = useWindowDimensions();
	
	useEffect(()=> {
	
	},[visible])
	
	return (
		<ImageView
			images={images ?? []}
			imageIndex={0}
			visible={visible}
			onRequestClose={ClosePreviewProduct}
		/>
	);
}

export default connect(
	mapStateToProps,{ClosePreviewProduct}
)(MediasModal);