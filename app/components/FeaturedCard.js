import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../constants/theme';

const FeaturedCard = ({image, title, dataCollection}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Items', {type: 'Fashion'})}
      style={{
        marginBottom: 20,
      }}>
      <Image
        style={{
          width: '100%',
          height: 450,
          //aspectRatio : 2 / 2,
        }}
        source={image}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          paddingLeft: '35%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black color
            borderRadius: 8,
          }}
        />
        <Text
          style={{
            ...FONTS.fontSatoshiLight,
            color: COLORS.white,
            fontSize: 36,
            letterSpacing: 12,
            marginHorizontal: -26,
          }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const padmaCollection = dataCollection.find(
              collection => collection.title === 'Padma',
            );
            const kamalaCollection = dataCollection.find(
              collection => collection.title === 'Kamala',
            );
            if (padmaCollection && title === 'PADMA') {
              navigation.navigate('Items', {
                collectionId: padmaCollection.id,
                colletionTitle: padmaCollection.title,
                type: 'Fashion',
              });
            } else {
              navigation.navigate('Items', {
                collectionId: kamalaCollection.id,
                colletionTitle: kamalaCollection.title,
                type: 'Fashion',
              });
            }
          }}
          style={{
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: COLORS.white,
            marginTop: 10,
          }}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.white,
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}>
            SHOP NOW
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
