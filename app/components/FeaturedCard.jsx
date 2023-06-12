import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../constants/theme';

const FeaturedCard = ({ image, title, dataCollection, imagePath, hiddenBtn, categories }) => {
  const navigation = useNavigation();

  const navigateToItems = query => {
    navigation.navigate('Items', {
      query,
      categories,
    });
  };

  const findCategory = description => {
    return dataCollection.find(categories => categories?.description === description);
  };

  const handlePress = () => {
    if (categories) {
      const topCategories = findCategory('TOP');
      const outerWearCategories = findCategory('OUTER');
      const bottomCategories = findCategory('PANTS');
      const dressCategories = findCategory('DRESS');

      if (topCategories && title === 'TOP') {
        navigateToItems(topCategories.description);
      } else if (outerWearCategories && title === 'OUTER') {
        navigateToItems(outerWearCategories.description);
      } else if (bottomCategories && title === 'PANTS') {
        navigateToItems(bottomCategories.description);
      } else if (dressCategories && title === 'DRESS') {
        navigateToItems(dressCategories.description);
      } else {
        navigateToItems('Fashion');
      }
    } else {
      const collectionData = dataCollection.description;

      if (collectionData && (title === 'PADMA' || title === 'KAMALA')) {
        navigateToItems(title);
      } else {
        navigateToItems('Fashion');
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={{
        marginBottom: 20,
      }}
    >
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
          position: 'absolute',
          width: '100%',
          paddingLeft: '35%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
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
            marginHorizontal:
              imagePath && title === 'TOP'
                ? 18
                : imagePath && title === 'PANTS'
                ? 3
                : imagePath && title === 'OUTER'
                ? 5
                : imagePath && title === 'DRESS'
                ? 8
                : imagePath
                ? -5
                : -52,
          }}
        >
          {title}
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
};

export default FeaturedCard;
