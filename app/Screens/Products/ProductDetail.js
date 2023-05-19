import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import RenderHTML from 'react-native-render-html';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
// import pic1 from '../../assets/images/shop/detail/pic1.png';
// import pic2 from '../../assets/images/shop/pic2.png';
// import pic3 from '../../assets/images/shop/pic3.png';
// import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {Snackbar} from 'react-native-paper';
import ProductCardStyle1 from '../../components/ProductCardStyle1';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';
import SelectInput from '../../components/SelectInput';
import {Footer, ShowHideProductDetail} from '../../components/Footer';
import {formatWithCommas} from '../../utils/helper';
import CustomHTML from '../../components/CustomHtml.js';
// import CustomHTML from '../../components/CustomHTML.js';
// import product1 from '../../assets/images/product/product1.jpg';
// import product2 from '../../assets/images/product/product2.jpg';

// const productImage = [pic1, pic2, pic3];
// const chooseSize = [
//   {label: 'M', value: 'm'},
//   {label: 'L', value: 'l'},
//   {label: 'XL', value: 'xl'},
// ];

// const chooseColor = [
//   {label: 'RED', value: 'red'},
//   {label: 'BLACK', value: 'black'},
//   {label: 'BLUE', value: 'blue'},
// ];

const SuggestData = [
  {
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/IAUE6uWf13.jpg',
    title: 'JACQUARD NALIKA 011',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '30% off',
  },
  {
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/pJyJVN2956.jpg',
    title: 'Zip-Front Track Jacket',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '40% off',
  },
];

const ProductDetail = ({navigation, route}) => {
  const {item, category} = route.params;
  const productColors = ['#A29698', '#80C6A9', '#8E84CA', '#E5907D'];
  // console.log('colors', item.colors);

  const [isLike, setIsLike] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');
  const [selectedVal, setSelectedVal] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleSelectSize = value => {
    setSelectedVal(value);
  };

  const handleSelectColor = value => {
    setSelectedColor(value);
  };

  var ratingArry = [];
  for (var i = 0; i < 4; i++) {
    ratingArry.push(i);
  }

  const sizes = item.variant;
  const colors = item.colors;

  const chooseSize = sizes?.map(size => ({
    label: size,
    value: size,
  }));

  const chooseColor = colors?.map(color => ({
    label: color,
    value: color,
  }));

  const scrollViewRef = React.useRef(null);

  // const [activeColor, setActiveColor] = useState(productColors[0]);

  const handleLike = () => {
    if (isLike) {
      setSnackText('Item removed to Favourite.');
    } else {
      setSnackText('Item add to Favourite.');
    }
    setIsSnackbar(true);
    setIsLike(!isLike);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <ScrollView ref={scrollViewRef}>
        <HeaderBateeq />
        <View style={{paddingHorizontal: 20}}>
          <Header titleLeft leftIcon={'back'} title={'back'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Swiper
            style={{height: 500}}
            dotStyle={{
              height: 10,
              width: 10,
              borderWidth: 2,
              borderColor: COLORS.white,
              borderRadius: 10,
            }}
            activeDotStyle={{
              height: 10,
              width: 10,
              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}>
            {item?.images?.map(data => {
              return (
                <View key={data.product_id}>
                  <Image
                    source={item.imagePath ? item.imagePath : {uri: data.src}}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 200 / 300,
                    }}
                  />
                  <LinearGradient
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      top: 0,
                      left: 0,
                    }}
                    colors={[
                      'rgba(0,0,0,.3)',
                      'rgba(0,0,0,0)',
                      'rgba(0,0,0,0)',
                    ]}></LinearGradient>
                </View>
              );
            })}
          </Swiper>
          {/* <TouchableOpacity
            onPress={() => handleLike()}
            activeOpacity={0.95}
            style={{
              height: 60,
              width: 60,
              backgroundColor: COLORS.primaryLight,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: -30,
              right: 30,
            }}>
            {isLike ? (
              <FontAwesome name="heart" color={COLORS.primary} size={22} />
            ) : (
              <FontAwesome name="heart-o" color={COLORS.primary} size={22} />
            )}
          </TouchableOpacity> */}
        </View>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              alignItems: 'flex-start',
              //   borderBottomWidth: 1,
              //   borderColor: COLORS.borderColor,
              paddingBottom: 12,
            }}>
            {/* <View
              style={{
                backgroundColor: COLORS.primaryLight,
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: SIZES.radius,
                marginBottom: 14,
                marginTop: 10,
              }}>
              <Text style={{...FONTS.fontLg, color: COLORS.primary}}>
                {category}
              </Text>
            </View> */}
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                fontSize: 24,
                color: COLORS.title,
                marginBottom: 3,
              }}>
              {item.title}
            </Text>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              {item.oldPrice && (
                <Text
                  style={{
                    ...FONTS.fontSatoshiRegular,
                    textDecorationLine: 'line-through',
                    fontSize: 16,
                  }}>
                  Rp {formatWithCommas(Number(item.oldPrice).toLocaleString())}
                </Text>
              )}
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  fontSize: 20,
                }}>
                Rp {formatWithCommas(Number(item.price).toLocaleString())}
              </Text>
            </View>
            {item.desc && <CustomHTML htmlContent={item.desc} />}
            {/* <View style={{...FONTS.font, color: COLORS.text}}>
            {item.desc && <RenderHTML source={{ html: item.desc }} />}
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 4,
                  }}>
                  {ratingArry.map((data, index) => {
                    return (
                      <Octicons
                        key={index}
                        size={16}
                        style={{marginRight: 5}}
                        color={'#FFA800'}
                        name="star-fill"
                      />
                    );
                  })}
                </View>
                <Text style={FONTS.font}>(256 Reviews)</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                {productColors.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => setActiveColor(data)}
                      key={index}
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        marginLeft: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {activeColor === data && (
                        <View
                          style={{
                            height: 24,
                            width: 24,
                            borderRadius: 24,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            position: 'absolute',
                          }}
                        />
                      )}
                      <View
                        style={{
                          height: 16,
                          width: 16,
                          borderRadius: 16,
                          backgroundColor: data,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View> */}
            <View style={{width: '100%', marginTop: 20}}>
              <SelectInput
                label="Choose Size"
                options={chooseSize}
                onSelect={handleSelectSize}
                placeholder="Choose Size"
                customDetail
              />
              {chooseColor?.length > 0 && (
                <SelectInput
                  label="Choose Color"
                  options={chooseColor}
                  onSelect={handleSelectColor}
                  placeholder="Choose Color"
                  customDetail
                />
              )}
              <View>
                <Text
                  style={{
                    marginBottom: 8,
                    ...FONTS.fontSatoshiBold,
                    color: COLORS.title,
                  }}>
                  Quantity <Text style={{color: COLORS.danger}}>*</Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      itemQuantity > 1 && setItemQuantity(itemQuantity - 1)
                    }
                    style={{
                      height: 32,
                      width: 30,
                      borderWidth: 1,
                      // borderRadius:6,
                      borderColor: COLORS.borderColor,
                      backgroundColor: '#AAAAAA',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FeatherIcon size={14} color={COLORS.white} name="minus" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      width: '79%',
                      textAlign: 'center',
                      borderWidth: 1,
                      marginHorizontal: 8,
                      paddingVertical: 5,
                      paddingHorizontal: 50,
                    }}>
                    {itemQuantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setItemQuantity(itemQuantity + 1)}
                    style={{
                      height: 32,
                      width: 30,
                      borderWidth: 1,
                      // borderRadius:6,
                      backgroundColor: '#303030',
                      borderColor: COLORS.borderColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <FeatherIcon size={14} color={COLORS.white} name="plus" />
                  </TouchableOpacity>
                </View>
                <ShowHideProductDetail />
              </View>
            </View>
          </View>
          {/* <View
            style={{
              paddingTop: 15,
              //   borderBottomWidth: 1,
              //   borderColor: COLORS.borderColor,
              paddingBottom: 12,
            }}>
            <Text style={{...FONTS.h6, marginBottom: 5}}>Specifications</Text>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Text style={{...FONTS.font, color: COLORS.title, flex: 1}}>
                Brand
              </Text>
              <Text style={FONTS.font}>Femall Clothing</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Text style={{...FONTS.font, color: COLORS.title, flex: 1}}>
                Weight
              </Text>
              <Text style={FONTS.font}>260gr</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Text style={{...FONTS.font, color: COLORS.title, flex: 1}}>
                Condition
              </Text>
              <Text style={FONTS.font}>NEW</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 5}}>
              <Text style={{...FONTS.font, color: COLORS.title, flex: 1}}>
                Category
              </Text>
              <Text style={{...FONTS.font, color: COLORS.primary}}>
                Sleep Suits
              </Text>
            </View>
          </View> */}
          <View
            style={{
              marginTop: 20,
              paddingTop: 12,
              borderTopWidth: 1,
              borderColor: COLORS.borderColor,
            }}>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                fontSize: 20,
                marginBottom: 20,
              }}>
              You May Like
            </Text>
            {/* <Text style={{...FONTS.font, color: COLORS.text}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </Text> */}
            <View style={{marginBottom: 10}}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {/* <ScrollView
            contentContainerStyle={{paddingLeft: 15}}
            horizontal
            showsHorizontalScrollIndicator={false}> */}
                {SuggestData.map(({image, title, price, oldPrice}, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: 150,
                        marginRight: 10,
                        marginBottom: 20,
                      }}>
                      <ProductCardStyle1
                        onPress={() =>
                          navigation.navigate('ProductDetail', {
                            item: {
                              title: title,
                              image: image,
                              oldPrice: oldPrice,
                              price: price,
                            },
                            // category : "Appliances"
                          })
                        }
                        imageSrc={image}
                        title={title}
                        price={price}
                        oldPrice={oldPrice}
                        // offer={data.offer}
                      />
                    </View>
                  );
                })}
                {/* </ScrollView> */}
              </View>
              {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Items', {type: 'Fashion'})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                width: 200,
                height: 48,
              }}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  marginRight: 2,
                }}>
                See More
              </Text>
            </TouchableOpacity>
          </View> */}
            </View>
          </View>
        </View>
        <Footer />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 12,
          }}>
          <View style={{marginRight: 20, paddingVertical: 20}}>
            <CustomButton
              onPress={() => navigation.navigate('Wishlist')}
              outline
              customWidth={150}
              title="Wishlist"
              wishlistIcon
            />
          </View>
          <View>
            <CustomButton
              onPress={() => navigation.navigate('Cart')}
              customWidth={150}
              title="Add To Cart"
              bagIcon
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={isSnackbar}
        duration={3000}
        onDismiss={() => setIsSnackbar(false)}
        action={{
          label: 'Wishlist',
          onPress: () => {
            navigation.navigate('Wishlist');
          },
        }}>
        {snackText}
      </Snackbar>
    </SafeAreaView>
  );
};

export default ProductDetail;
