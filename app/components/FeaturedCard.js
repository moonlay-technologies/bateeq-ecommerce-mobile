import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../constants/theme';

const FeaturedCard = ({
  image,
  title,
  dataCollection,
  imagePath,
  hiddenBtn,
  categories,
}) => {
  // console.log('dataColllection', dataCollection);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (categories) {
          const topCategories = dataCollection.find(
            categories => categories?.node?.description === 'TOP',
          );
          const outerWearCategories = dataCollection.find(
            categories => categories?.node?.description === 'OUTER',
          );
          const bottomCategories = dataCollection.find(
            categories => categories?.node?.description === 'PANTS',
          );
          const dressCategories = dataCollection.find(
            categories => categories?.node?.description === 'DRESS',
          );

          if (topCategories && title === 'TOP') {
            navigation.navigate('Items', {
              query: topCategories.node.description,
              categories: categories,
              // type: 'Fashion',
            });
          } else if (outerWearCategories && title === 'OUTER') {
            navigation.navigate('Items', {
              query: outerWearCategories.node.description,
              categories: categories,
              // type: 'Fashion',
            });
          } else if (bottomCategories && title === 'PANTS') {
            navigation.navigate('Items', {
              query: bottomCategories.node.description,
              categories: categories,
              // type: 'Fashion',
            });
          } else if (dressCategories && title === 'DRESS') {
            navigation.navigate('Items', {
              query: dressCategories.node.description,
              categories: categories,
              // type: 'Fashion',
            });
          } else {
            navigation.navigate('Items', {type: 'Fashion'});
          }
        } else {
          const collectionData = dataCollection.description;

          if (collectionData && title === 'PADMA') {
            navigation.navigate('Items', {
              query: title,
              // type: 'Fashion',
            });
          } else if (collectionData && title === 'KAMALA') {
            navigation.navigate('Items', {
              query: title,
              // type: 'Fashion',
            });
          } else {
            navigation.navigate('Items', {type: 'Fashion'});
          }
        }
      }}
      style={{
        marginBottom: 20,
        // flex: imagePath ? 1 : 0,
        // marginHorizontal: imagePath ? 5 : 0
      }}>
      <Image
        style={{
          width: '100%',
          height: imagePath ? undefined : 450,
          aspectRatio: imagePath ? 80 / 120 : null,
        }}
        source={{uri: image}}
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
          }}>
          {title}
        </Text>
        <TouchableOpacity
           onPress={() => {
            if (categories) {
              const topCategories = dataCollection.find(
                categories => categories?.node?.description === 'TOP',
              );
              const outerWearCategories = dataCollection.find(
                categories => categories?.node?.description === 'OUTER',
              );
              const bottomCategories = dataCollection.find(
                categories => categories?.node?.description === 'PANTS',
              );
              const dressCategories = dataCollection.find(
                categories => categories?.node?.description === 'DRESS',
              );
    
              if (topCategories && title === 'TOP') {
                navigation.navigate('Items', {
                  query: topCategories.node.description,
                  categories: categories,
                  // type: 'Fashion',
                });
              } else if (outerWearCategories && title === 'OUTER') {
                navigation.navigate('Items', {
                  query: outerWearCategories.node.description,
                  categories: categories,
                  // type: 'Fashion',
                });
              } else if (bottomCategories && title === 'PANTS') {
                navigation.navigate('Items', {
                  query: bottomCategories.node.description,
                  categories: categories,
                  // type: 'Fashion',
                });
              } else if (dressCategories && title === 'DRESS') {
                navigation.navigate('Items', {
                  query: dressCategories.node.description,
                  categories: categories,
                  // type: 'Fashion',
                });
              } else {
                navigation.navigate('Items', {type: 'Fashion'});
              }
            } else {
              const collectionData = dataCollection.description;
    
              if (collectionData && title === 'PADMA') {
                navigation.navigate('Items', {
                  query: title,
                  // type: 'Fashion',
                });
              } else if (collectionData && title === 'KAMALA') {
                navigation.navigate('Items', {
                  query: title,
                  // type: 'Fashion',
                });
              } else {
                navigation.navigate('Items', {type: 'Fashion'});
              }
            }
          }}
          style={{
            paddingHorizontal: imagePath ? 2 : 12,
            paddingVertical: imagePath ? 2 : 10,
            borderWidth: hiddenBtn ? 0 : 1,
            borderColor: COLORS.white,
            marginTop: 10,
          }}>
          {hiddenBtn ? null : (
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.white,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}>
              SHOP NOW
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
