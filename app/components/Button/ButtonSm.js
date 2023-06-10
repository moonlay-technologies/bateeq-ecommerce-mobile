import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const ButtonSm = (props) => {
    const { 
        onPress=()=>{}, 
        style, 
        disabled,
        textStyle,
        title
     } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{
                ...style,
                paddingHorizontal:10,
                paddingVertical:8,
                alignItems:'center',
                borderRadius: props.btnSquare ? 0 : props.btnRounded ? 20 : SIZES.radius_sm,
            }]}
        >
            <Text style={{
                ...FONTS.fontSm,
                ...FONTS.fontPoppins, 
                color:textStyle?.color ? textStyle.color : COLORS.white,
                fontWeight: textStyle?.fontWeight 
                ? textStyle.fontWeight 
                : '500'
              }}
            >{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonSm;