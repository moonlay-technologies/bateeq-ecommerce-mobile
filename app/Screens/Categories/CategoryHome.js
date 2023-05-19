import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ProductCardStyle2 from '../../components/ProductCardStyle2';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import FashionData from '../../JSON/Fashion.json';
import MobilesData from '../../JSON/Mobiles.json';
import FurnitureData from '../../JSON/Furniture.json';
import ElectronicsData from '../../JSON/Electronics.json';
import GroceryData from '../../JSON/Grocery.json';
import AppliancesData from '../../JSON/Appliances.json';
import BookToysData from '../../JSON/BooksToys.json';
import ProductListItem from '../../components/ProductListItem';

const FavouriteHome = ({navigation, route}) => {
  const {title} = route.params;

  const pageData =
    title === 'Fashion'
      ? FashionData
      : title === 'Mobiles'
      ? MobilesData
      : title === 'Electronics'
      ? ElectronicsData
      : title === 'Furniture'
      ? FurnitureData
      : title === 'Grocery'
      ? GroceryData
      : title === 'Appliances'
      ? AppliancesData
      : title === 'Books,Toys'
      ? BookToysData
      : [];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={18} name="arrow-left" />
          )}
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontBold,
            color: COLORS.title,
            flex: 1,
            bottom: 1,
            marginLeft: 5,
          }}>
          {title}
        </Text>
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={20} name="search" />
          )}
          size={25}
          onPress={() => navigation.navigate('Search')}
        />
        <IconButton
          icon={() => (
            <FeatherIcon color={COLORS.title} size={20} name="heart" />
          )}
          size={25}
          onPress={() => navigation.navigate('Wishlist')}
        />
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon
                color={COLORS.title}
                size={20}
                name="shopping-cart"
              />
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -4,
                  right: -6,
                }}>
                <Text
                  style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                  2
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {pageData.slider && (
          <Swiper
            autoplay={true}
            autoplayTimeout={6}
            height={'auto'}
            dotColor={'rgba(255,255,255,.3)'}
            activeDotColor={COLORS.white}
            paginationStyle={{bottom: 10}}>
            {pageData.slider.map((data, index) => {
              return (
                <View key={index}>
                  <LinearGradient
                    colors={['transparent', 'transparent', 'rgba(0,0,0,.4)']}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      zIndex: 1,
                    }}></LinearGradient>
                  <Image
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 250 / 100,
                    }}
                    source={{uri: data.image}}
                  />
                </View>
              );
            })}
          </Swiper>
        )}

        {pageData.categories && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderColor,
              paddingBottom: 5,
            }}>
            {pageData.categories.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '25%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Items', {type: title})}
                    style={{
                      alignItems: 'center',
                      marginBottom: 18,
                    }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 60,
                        backgroundColor: '#FFF1F6',
                        borderWidth: 1,
                        borderColor: '#FFD9E7',
                        marginBottom: 6,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: 60,
                        }}
                        source={{uri: data.image}}
                      />
                    </View>
                    <Text
                      style={{
                        ...FONTS.fontXs,
                        ...FONTS.fontBold,
                        color: COLORS.title,
                        textAlign: 'center',
                      }}>
                      {data.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {pageData.sale &&
          pageData.sale.map((data, index) => {
            if (data.layout == '1') {
              return (
                <View key={index} style={GlobalStyleSheet.container}>
                  <Text style={{...FONTS.h6, marginBottom: 8}}>
                    {data.title}
                  </Text>
                  <View style={{marginHorizontal: -15}}>
                    <ScrollView
                      contentContainerStyle={{paddingLeft: 15}}
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {data.items &&
                        data.items.map((data, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: 150,
                                marginRight: 10,
                              }}>
                              <ProductCardStyle2
                                onPress={() =>
                                  navigation.navigate('Items', {type: title})
                                }
                                imageUrl={data.image}
                                category={data.title}
                                title={data.offer}
                              />
                            </View>
                          );
                        })}
                    </ScrollView>
                  </View>
                </View>
              );
            } else if (data.layout == '2') {
              return (
                <View
                  key={index}
                  style={{
                    ...GlobalStyleSheet.container,
                    backgroundColor: COLORS.secondary,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h6,
                      color: COLORS.white,
                      marginBottom: 8,
                      marginTop: 10,
                    }}>
                    {data.title}
                  </Text>
                  <View style={GlobalStyleSheet.row}>
                    {data.items &&
                      data.items.map((data, index) => {
                        return (
                          <View key={index} style={GlobalStyleSheet.col50}>
                            <TouchableOpacity
                              activeOpacity={0.9}
                              onPress={() =>
                                navigation.navigate('Items', {type: title})
                              }
                              style={{
                                backgroundColor: COLORS.white,
                                marginBottom: 10,
                                borderRadius: 6,
                                overflow: 'hidden',
                              }}>
                              <Image
                                style={{
                                  width: '100%',
                                  height: undefined,
                                  aspectRatio: 100 / 100,
                                }}
                                source={{uri: data.image}}
                              />
                              <View
                                style={{
                                  paddingHorizontal: 15,
                                  paddingVertical: 10,
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    ...FONTS.font,
                                    ...FONTS.fontBold,
                                    color: COLORS.title,
                                    marginBottom: 2,
                                  }}>
                                  {data.title}
                                </Text>
                                <Text style={{...FONTS.font, color: '#1ba353'}}>
                                  {data.offer}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                </View>
              );
            }
          })}

        {/* <ImageBackground
                    source={bg1}
                    style={{
                        height:60,
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <Image
                        style={{
                            width:70,
                            height:60,
                            marginLeft:20,
                            marginRight:'12%',
                        }}
                        source={offer}
                    />
                    <View style={{paddingTop:4}}>
                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:COLORS.white}}>Sale ends in</Text>
                        <CountDown
                            until={1000000}
                            digitStyle={{
                                padding:0,
                                height:18,
                                paddingRight:25,
                            }}
                            style={{
                                flexDirection:'row',
                                marginBottom:6,
                                marginTop:2,
                            }}
                            timeLabels={{d: 'day', h: 'hrs', m: 'min', s: 'sec'}}
                            size={20}
                            digitTxtStyle={{
                                ...FONTS.h6,
                                color:COLORS.white
                            }}
                            timeLabelStyle={{
                                ...FONTS.font,
                                fontSize:10,
                                top:0,
                                color:COLORS.white,
                                position:'absolute',
                                right:0,
                                width:25,
                            }}
                        />
                    </View>
                </ImageBackground> */}

        {pageData.trendItems && (
          <View style={GlobalStyleSheet.container}>
            <Text style={{...FONTS.h6, marginBottom: 8, marginTop: 4}}>
              {pageData.trendItems.title}
            </Text>
            <View style={{marginHorizontal: -15}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingLeft: 15,
                }}>
                {pageData.trendItems.data.map((data, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate('Items', {type: title})
                      }
                      key={index}
                      style={{
                        width: 180,
                        marginRight: 10,
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: undefined,
                          aspectRatio: 80 / 100,
                          borderRadius: 6,
                          marginBottom: 6,
                        }}
                        source={{uri: data.image}}
                      />
                      <Text style={{...FONTS.h6, fontSize: 15}}>
                        {data.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}
        <Image
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 220 / 100,
          }}
          source={{uri: pageData.middleBanner}}
        />
        {pageData.recentViewItems && (
          <>
            <View
              style={{
                ...GlobalStyleSheet.container,
                paddingBottom: 4,
                borderTopWidth: 1,
                borderTopColor: COLORS.borderColor,
              }}>
              <Text style={{...FONTS.h6}}>Recent Viewed Items</Text>
            </View>
            {pageData.recentViewItems.map((data, index) => (
              <ProductListItem
                onPress={() => navigation.navigate('Items', {type: title})}
                key={index}
                imageUrl={data.image}
                title={data.title}
                desc={data.desc}
                price={data.price}
                oldPrice={data.oldPrice}
                offer={data.offer}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteHome;
