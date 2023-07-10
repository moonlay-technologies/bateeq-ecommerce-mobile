import React from 'react';
import {Image, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import {findKey} from "../../utils/helper";
import {COLORS} from "../../constants/theme";

function mapStateToProps(state) {
 return {

 };
}

/**
 *
 * @param {object} props
 * @param {object} props.`
 * @param {object} props.swiper
 * @param {object} props.swiper.dotStyle
 * @param {string | string[] | undefined} props.keyUnique
 * @param {string | string[] | undefined} props.keyUri
 * @param { Array | Object[] | [] } props.data
 * @param {object | undefined} props.style
 * @param {object | undefined} props.imageStyle
 * @param {object | undefined} props.linear
 * @param { Array | string[]} props.linear.colors
 *\\\
 * @returns {JSX.Element}
 */
function Sliders({...props})  {
	let defaultSwiper = {
		style: {
			height: 500,
		},
		dotStyle: {
			height: 10,
			width: 10,
			borderWidth: 2,
			borderColor: COLORS.white,
			borderRadius: 10,
		},
		activeDotStyle: {
			height: 10,
			width: 10,
			backgroundColor: COLORS.white,
			borderRadius: 10,
		}
	}
	let {
		style= {},
		swiper = {...defaultSwiper} ,
		data,
		imageStyle = {
			width: '100%',
			aspectRatio: 2/3,
		},
		linear = {
			style: {
				width: '100%',
				borderWidth: 1,
			},
			colors:['rgba(0,0,0,.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)']
		},
		keyUnique = [],
		keyUri = [],
	} = props
  return (
		<View style={{...style}}>
			<Swiper {...defaultSwiper} {...swiper}>
				{
					Array.isArray(data) && data.length > 0  &&
					data?.map((item,index)=> {
						return (
							<View key={findKey(item, keyUnique ?? ['id']) ?? index}>
								<Image
									source={{uri: findKey(item, keyUri ?? ['node','url']) ?? null }}
									style={{
										...imageStyle,
									}}
								/>
								{/*<LinearGradient*/}
								{/*	{...linear}*/}
								{/*/>*/}
							</View>
						)
					})
				}
			</Swiper>
		</View>
  );
}

export default Sliders