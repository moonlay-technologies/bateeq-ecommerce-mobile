import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DropShadow from 'react-native-drop-shadow';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {formatWithCommas} from '../utils/helper';

const ItemCard = props => {
  const {
    // category,
    subCategory,
    image,
    // title,
    images,
    price,
    oldPrice,
    rating,
    itemName,
    description,
    // handleLike,
    // id,
    // isLike,
    shopBtn,
    listView,
    imageSrc,
  } = props;

  const navigation = useNavigation();
  const numericPrice = Number(price.replace(/[^0-9.-]+/g, ''));

//   console.log('description', description)
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 5,
        //     height: 5,
        // },
        shadowOpacity: listView ? 0.1 : 0.06,
        shadowRadius: 5,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {
            item: {
              title: itemName,
              image: imageSrc,
              oldPrice: oldPrice,
              price: price,
              images: images
            },
            category: 'Appliances',
          })
        }
        activeOpacity={0.98}
        style={[
          {
            // backgroundColor:COLORS.white,
            marginBottom: 15,
          },
          listView && {
            flexDirection: 'row',
            //elevation:8,
          },
        ]}>
        <View>
            {/* <TouchableOpacity
                style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                }}
                onPress={() => handleLike(id)}>
                {isLike ? (
                <FontAwesome name="heart" color={COLORS.title} size={20} />
                ) : (
                <FontAwesome name="heart-o" color={COLORS.white} size={20} />
                )}
            </TouchableOpacity> */}
          <Image
            style={[
              {
                // borderRadius:SIZES.radius,
                width: 150,
                height: 225,
              },
              listView && {
                width: 110,
                height: 130,
              },
            ]}
            source={imageSrc ? {uri: imageSrc} : image}
          />
        </View>
        <View
          style={[
            {
              // backgroundColor:COLORS.white,
              width: 150,
              shadowColor: 'rgba(0,0,0,.5)',
              // elevation : 10,
              // borderRadius:SIZES.radius,
              position: 'relative',
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingHorizontal:5,
              paddingBottom: 12,
              paddingTop: 15,
              marginTop: 5,
            },
            listView && {
              marginTop: 0,
              flex: 1,
              paddingHorizontal: 20,
              borderRadius: 0,
              elevation: 0,
              paddingTop: 20,
              backgroundColor: 'transparent',
            },
          ]}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              marginBottom: 3,
              fontSize: 12,
              textAlign: 'center'
            }}>
            {itemName}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.fontSatoshiRegular,
              color: COLORS.label,
              marginBottom: 10,
              fontSize: 12,
            }}>
            {subCategory}
          </Text>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            {oldPrice && (
              <Text
                style={{
                  ...FONTS.fontXs,
                  marginBottom: 2,
                  textDecorationLine: 'line-through',
                }}>
                Rp {formatWithCommas(Number(oldPrice).toLocaleString())}
              </Text>
            )}
            <Text style={{...FONTS.h6, marginRight: 15}}>
              Rp {formatWithCommas(Number(numericPrice).toLocaleString())}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: rating ? 8 : 0,
            }}>
            {rating && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <FontAwesome name="star" color="#FFA800" size={16} />
                <Text
                  style={{
                    ...FONTS.font,
                    color: COLORS.title,
                    ...FONTS.fontBold,
                    marginLeft: 4,
                  }}>
                  {rating}
                </Text>
              </View>
            )}
            {shopBtn != false && (
              <TouchableOpacity style={{top: -4}}>
                <Feather
                  name="shopping-cart"
                  color={COLORS.primary}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default ItemCard;
