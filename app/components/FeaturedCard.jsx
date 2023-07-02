import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../constants/theme';

function FeaturedCard({ image, title, titleDes, imagePath, hiddenBtn, categories }) {
  const navigation = useNavigation();

  const navigateToItems = handle => {
    navigation.navigate('Items', {
      handle,
      subTitle: title?.title || titleDes,
    });
  };

  const handlePress = () => {
    navigateToItems(
      categories && titleDes === 'TOP'
        ? 'womenswear-top'
        : categories && titleDes === 'PANTS'
        ? 'bottom'
        : categories && titleDes === 'OUTER'
        ? 'outer'
        : categories && titleDes === 'DRESS'
        ? 'dress'
        : title?.handle
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Image
        style={{
          width: '100%',
          height: imagePath ? undefined : 450,
          aspectRatio: imagePath ? 80 / 120 : null,
        }}
        source={{ uri: image }}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          // paddingLeft: '35%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            alignContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 8,
          }}
        />
        <Text
          style={{
            ...FONTS.fontSatoshiLight,
            color: COLORS.white,
            textAlign: 'left',
            fontWeight: imagePath ? '700' : '200',
            fontSize: imagePath ? 13 : 36,
            letterSpacing: imagePath ? 2 : 16,
            textTransform: 'uppercase',
          }}
        >
          {title?.title || titleDes}
        </Text>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            paddingHorizontal: imagePath ? 2 : 12,
            paddingVertical: imagePath ? 2 : 10,
            borderWidth: hiddenBtn ? 0 : 1,
            borderColor: COLORS.white,
            marginTop: 10,
          }}
        >
          {hiddenBtn ? null : (
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.white,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
            >
              SHOP NOW
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default FeaturedCard;
