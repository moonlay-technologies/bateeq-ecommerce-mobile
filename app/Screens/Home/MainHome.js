import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import moment from 'moment';
import {IconButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
// import mobile from '../../assets/images/category/mobile.png';
// import electronics from '../../assets/images/category/electronics.png';
// import fashion from '../../assets/images/category/fashion.png';
// import furniture from '../../assets/images/category/furniture.png';
// import grocery from '../../assets/images/category/grocery.png';
// import appliances from '../../assets/images/category/appliances.png';
// import toys from '../../assets/images/category/toys.png';
import bg3 from '../../assets/images/background/bg3.jpg';
// import offer from '../../assets/images/offer/pic1.png';
import banner1 from '../../assets/images/banner/image-banner-1.jpg';
import banner2 from '../../assets/images/banner/image-banner-2.jpg';
import banner3 from '../../assets/images/banner/image-banner-3.jpg';
import banner4 from '../../assets/images/banner/image-banner-4.jpg';
// import product1 from '../../assets/images/product/product1.jpg';
// import product2 from '../../assets/images/product/product2.jpg';
// import product3 from '../../assets/images/product/product3.jpg';
// import product4 from '../../assets/images/product/product4.jpg';
// import item1 from '../../assets/images/product/pic9.png';
// import item2 from '../../assets/images/product/pic10.png';
// import item3 from '../../assets/images/product/pic11.png';
// import item4 from '../../assets/images/product/pic12.png';
// import item5 from '../../assets/images/product/pic13.png';
// import item6 from '../../assets/images/product/pic14.png';
// import item7 from '../../assets/images/product/pic15.png';
import {COLORS, FONTS} from '../../constants/theme';
import Swiper from 'react-native-swiper';
import ProductCardStyle1 from '../../components/ProductCardStyle1';
// import ProductCardStyle2 from '../../components/ProductCardStyle2';
import FeaturedCard from '../../components/FeaturedCard';
// import ProductListItem from '../../components/ProductListItem';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import StopWatch from '../../components/StopWatch';
// import SliderBestProduct from '../Products/BestSellerProduct';
import {Footer} from '../../components/Footer';
import {
  ProductApi,
  CollectionsApi,
  BlogApi,
  // TestimonialApi,
} from '../../service/shopify-api';
import CustomHTML from '../../components/CustomHtml';
// import ShopifyAPI from '../../service/ShopifyAPI';
// const categoryData = [
//   {
//     image: mobile,
//     title: 'Mobiles',
//   },
//   {
//     image: electronics,
//     title: 'Electronics',
//   },
//   {
//     image: fashion,
//     title: 'Fashion',
//   },
//   {
//     image: furniture,
//     title: 'Furniture',
//   },
//   {
//     image: grocery,
//     title: 'Grocery',
//   },
//   {
//     image: appliances,
//     title: 'Appliances',
//   },
//   {
//     image: toys,
//     title: 'Books,Toys',
//   },
//   {
//     title: 'More',
//   },
// ];
const title = 'Our Story';
const contentText =
  'Launched in 2013, bateeq is an Indonesian fashion brand that offers a fresh, fashion-forward take on batik through our clothing line for men, women and children, in addition to home decor. Known for our innovative motifs, bateeq provides a modern edge to a centuries-old craft to create effortless collections of ready-to-wear dresses, shirts, blouses and pants for today’s sophisticated consumer and retailers.';

const bannerData = [
  {
    image: banner2,
  },
  {
    image: banner1,
  },
  {
    image: banner3,
  },
];
const reviewData = [
  {
    text: "From the colours to the materials to the fits, we couldn't recommend this clothing brand more. The pieces are a true testament to everyday-chic and eternal comfort.",
    name: 'F. Marta',
    who: 'bateeq customer',
  },
  {
    text: "From the colours to the materials to the fits, we couldn't recommend this clothing brand more. The pieces are a true testament to everyday-chic and eternal comfort.",
    name: 'Salsabila',
    who: 'bateeq customer',
  },
  {
    text: "From the colours to the materials to the fits, we couldn't recommend this clothing brand more. The pieces are a true testament to everyday-chic and eternal comfort.",
    name: 'Yasona',
    who: 'bateeq customer',
  },
];

const journalText =
  'Do you know already what to wear this fall? Well any expert in fashion would tell you that clean and conservative looks are back in vogue. Layering is in so lay off the skin-baring for a bit. Get ready to style up with some volume and textured fabric and they are definitely the buzzwords this fall including rich colors like olive, burgundy, black, and grey. Don’t be shocked to see them in the runway or out on the streets by savvy street women.';

const FeaturedData = [
  {
    image: banner4,
    title: 'PADMA',
  },
  {
    image: bg3,
    title: 'KAMALA',
  },
];

const SuggestData = [
  {
    id: '1',
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/i8iimk6z91.jpg',
    title: 'JACQUARD NALIKA 011',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '30% off',
  },
  {
    id: '2',
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/kvSJRPi697.jpg',
    title: 'Zip-Front Track Jacket',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '40% off',
  },
  {
    id: '3',
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/bRgQTb9y28.jpg',
    title: 'Zip-Front Puffer Jacket',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '20% off',
  },
  {
    id: '4',
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/7kKTOrVP28.jpg',
    title: 'JACQUARD NALIKA 011',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '40% off',
  },
  {
    id: '5',
    image:
      'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/7kKTOrVP28.jpg',
    title: 'JACQUARD NALIKA 011',
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,200',
    // offer: '40% off',
  },
];

// const ProductData = [
//   {
//     type: 'Electronics',
//     image: item1,
//     category: 'Headphones',
//     title: 'Up to 80% off',
//   },
//   {
//     type: 'Mobiles',
//     image: item2,
//     category: 'Mobile phones',
//     title: 'From ₹9,999',
//   },
//   {
//     type: 'Electronics',
//     image: item3,
//     category: 'Laptops',
//     title: 'Up to 50% off',
//   },
// ];

// const PopularItemsData = [
//   {
//     imagePath: item4,
//     title: 'Havells Swing Fan',
//     desc: '400mm , Blue tone',
//     offer: '20% off',
//     price: '₹1,299',
//     oldPrice: '1500',
//   },
//   {
//     imagePath: item5,
//     title: 'OnePlus Nord 2T 5G',
//     desc: '8GB RAM, 128GB Storage',
//     offer: '50% off',
//     price: '₹24,099',
//     oldPrice: '30,000',
//   },
//   {
//     imagePath: item6,
//     title: 'ThinkPad L13 Yoga Gen 3',
//     desc: 'Dual dore , Red tone',
//     offer: '20% off',
//     price: '₹85,555',
//     oldPrice: '95,000',
//   },
// ];

// const TopSelectionData = [
//   {
//     type: 'Electronics',
//     image: item7,
//     title: 'Wired Earphones',
//     offer: 'upto 50% off',
//   },
//   {
//     type: 'Electronics',
//     image: item3,
//     title: 'Best Laptops',
//     offer: 'upto 50% off',
//   },
//   {
//     type: 'Electronics',
//     image: item1,
//     title: 'Headphones',
//     offer: 'upto 50% off',
//   },
//   {
//     type: 'Mobiles',
//     image: item2,
//     title: 'Top Mobiles',
//     offer: 'upto 50% off',
//   },
// ];

const FiveStars = () => {
  const stars = Array.from({length: 5}, (_, i) => (
    <FontAwesomeIcon
      key={i}
      color={'#374957'}
      size={20}
      name="star"
      style={{textAlign: 'center', marginVertical: 12}}
    />
  ));

  return <View style={{flexDirection: 'row'}}>{stars}</View>;
};

const MainHome = ({navigation}) => {
  const [email, setEmail] = useState('');
  // const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState(null);
  const [dataCustomCollection, setDataCustomCollection] = useState(null);
  const [dataBlogs, setDataBlogs] = useState(null);
  // const [dataTestimonial, setDataTestimonial] = useState(null);

  const dateJournal = dataBlogs?.image?.created_at;
  const dateJournalCreated = moment(dateJournal).format('MMMM DD, YYYY');

  useEffect(() => {
    getDataProducts();
    getDataCustomCollections();
    getDataBlog();
    // getDataTestimonial();
    // ShopifyAPI.getTestimonials()
    // getDataCount();
  }, []);

  const getDataProducts = () => {
    // setIsLoading(true);
    ProductApi.get()
      .then(res => {
        // console.log(res.products[0].images.map(src => src.src));
        // setIsLoading(false);
        setProductData(res.products);
      })
      .catch(error => {
        // setIsLoading(false);
        console.log('errorrr', error);
      });
  };

  const getDataCustomCollections = () => {
    // setIsLoading(true);
    CollectionsApi.get()
      .then(res => {
        // console.log(res.products[0].images.map(src => src.src));
        // setIsLoading(false);
        setDataCustomCollection(
          res.custom_collections.map(collection => ({
            id: collection.id,
            title: collection.title,
          })),
        );
      })
      .catch(error => {
        // setIsLoading(false);
        console.log('errorrr', error);
      });
  };
  const getDataBlog = () => {
    // setIsLoading(true);
    BlogApi.getArticleBlog(95999328539)
      .then(res => {
        setDataBlogs(res.articles[0]);

        // console.log(res.products[0].images.map(src => src.src));
        // setIsLoading(false);
        // setProductData(res.products);
      })
      .catch(error => {
        // setIsLoading(false);
        console.log('errorrr', error);
      });
  };

  // const getDataTestimonial = () => {
  //   TestimonialApi.get()
  //     .then(res => {
  //       console.log('res asset', res)
  //       setDataTestimonial(res)
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleSignUp = () => {
    navigation.navigate('Welcome');
  };

  const handlePress = () => {
    navigation.navigate('Home');
  };

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
          justifyContent: 'space-between',
          // borderBottomWidth:1,
          // borderBottomColor:COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <View
              style={{
                // borderWidth:1,
                // borderColor:COLORS.borderColor,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
        {/* <Text style={{...FONTS.fontSatoshiBold,color:COLORS.title,flex:1, fontSize: 18,justifyContent:'center',alignItems:'center', textAlign: 'center',marginLeft:5}}>bateeq</Text> */}
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={{width: 70, height: 35}}
            source={require('../../assets/images/logo.png')}
          />
        </TouchableOpacity>
        {/* <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='search'/>}
                    size={25}
                    onPress={() => navigation.navigate('Search')}
                /> */}
        {/* <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='heart'/>}
                    size={25}
                    onPress={() => navigation.navigate('Wishlist')}
                /> */}
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
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
      <ScrollView>
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          height={'auto'}
          dotColor={'rgba(255,255,255,.3)'}
          activeDotColor={COLORS.white}
          paginationStyle={{bottom: 10}}>
          {bannerData.map((data, index) => {
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
                    height: '100%',
                    aspectRatio: 200 / 300,
                  }}
                  source={data.image}
                />
              </View>
            );
          })}
        </Swiper>

        {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          {categoryData.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '25%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    data.title == 'More'
                      ? navigation.navigate('Categories')
                      : navigation.navigate('CategoryHome', {
                          title: data.title,
                        });
                    //navigation.navigate('Featured')
                  }}
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
                    {data.title == 'More' ? (
                      <MaterialIcons
                        color={COLORS.primary}
                        size={40}
                        name="more-horiz"
                      />
                    ) : (
                      <Image
                        style={{
                          width: '100%',
                          height: 60,
                        }}
                        source={data.image}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      ...FONTS.fontXs,
                      ...FONTS.fontBold,
                      color: COLORS.title,
                    }}>
                    {data.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View> */}
        <View
          style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.title,
              marginBottom: 16,
              ...FONTS.fontSatoshiBold,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.title,
              marginBottom: 16,
              textAlign: 'center',
              padding: 12,
              ...FONTS.fontSatoshiRegular,
            }}>
            {contentText}
          </Text>
          <TouchableOpacity
            // onPress={navigateToFullOurStory}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <Text
              style={{
                color: COLORS.title,
                ...FONTS.fontSatoshiRegular,
                fontSize: 16,
              }}>
              Learn More
            </Text>
            <Ionicons
              name="md-arrow-forward"
              size={12}
              color="#000"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 6,
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={bg3}
          style={{
            height: 300,
            width: '105%',
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Image
            style={{
              width: 70,
              height: 60,
              marginLeft: 20,
              marginRight: '12%',
            }}
            source={offer}
          /> */}
          <View
            style={{
              paddingTop: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              height: '100%',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 40,
              }}>
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.white,
                  marginBottom: 32,
                }}>
                RAMADHAN SALE!
              </Text>
              <Text
                style={{
                  ...FONTS.fontSatoshiRegular,
                  color: COLORS.white,
                  textAlign: 'center',
                  marginBottom: 33,
                }}>
                Rayakan Bulan Ramadan bersama kami dengan koleksi terbaru kami.
              </Text>
              <Text
                style={{
                  ...FONTS.fontSatoshiRegular,
                  color: COLORS.white,
                  textAlign: 'center',
                  marginBottom: 33,
                }}>
                Dapatkan harga termurah selagi masih ada!
              </Text>
              <StopWatch />
            </View>
          </View>
        </ImageBackground>

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 10,
          }}>
          {/* <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              color: COLORS.title,
              flex: 1,
            }}>
            Suggest for You
          </Text> */}
        </View>
        <View style={{marginBottom: 40, paddingHorizontal: 25}}>
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
            {productData?.slice(0, 4) &&
              productData?.slice(0, 4)?.map((product, index) => {
                // console.log('product', product.body_html);
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
                            title: product.title,
                            images: product.images,
                            oldPrice: product.variants[0].compare_at_price,
                            price: product.variants[0].price,
                            desc: product.body_html,
                            variant: product?.options[0]?.values,
                            colors: product?.options[1]?.values,
                          },
                          // category : "Appliances"
                        })
                      }
                      imageSrc={product?.images[0]?.src}
                      title={product.title}
                      price={product.variants[0].price}
                      oldPrice={product.variants[0].compare_at_price}
                      // offer={data.offer}
                    />
                  </View>
                );
              })}
            {/* </ScrollView> */}
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
          </View>
        </View>
        <View
          style={{
            ...GlobalStyleSheet.container,
            borderTopColor: COLORS.borderColor,
          }}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              marginBottom: 16,
              fontSize: 18,
              textAlign: 'center',
            }}>
            Our Collection
          </Text>
          {FeaturedData.map((data, index) => {
            return (
              <FeaturedCard
                key={index}
                image={data.image}
                title={data.title}
                dataCollection={dataCustomCollection}
              />
            );
          })}
        </View>
        <View>
          {/* <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            {ProductData.map((data, index) => (
              <View key={index} style={{flex: 1, paddingHorizontal: 5}}>
                <ProductCardStyle2
                  onPress={() =>
                    navigation.navigate('Items', {type: data.type})
                  }
                  image={data.image}
                  category={data.category}
                  title={data.title}
                />
              </View>
            ))}
          </View> */}
          {/* <SliderBestProduct /> */}
        </View>
        {/* <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 10,
            borderTopWidth: 1,
            borderColor: COLORS.borderColor,
            marginTop: 20,
          }}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontBold,
              color: COLORS.title,
              flex: 1,
            }}>
            Popular Items
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{...FONTS.fontSm, color: COLORS.title, marginRight: 2}}>
              View all
            </Text>
            <FeatherIcon size={16} color={COLORS.title} name="chevron-right" />
          </TouchableOpacity>
        </View> */}
        <View style={{padding: 20, marginVertical: 20}}>
          <Swiper
            autoplay={true}
            autoplayTimeout={6}
            height={'auto'}
            dotColor={'rgba(0, 0, 0, 0.5)'}
            activeDotColor={COLORS.dark}
            paginationStyle={{bottom: -20}}>
            {reviewData.map((data, index) => {
              return (
                <View key={index}>
                  {/* <LinearGradient
                  colors={['transparent', 'transparent', 'rgba(0,0,0,.4)']}
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                  }}></LinearGradient> */}
                  <View
                    style={{
                      padding: 20,
                      height: 200,
                      width: '90%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginBottom: 20,
                      backgroundColor: '#fff',
                      shadowColor: '#000',
                      borderTopWidth: 1,
                      borderTopColor: 'rgba(0,0,0,0.1)',
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.8,
                      shadowRadius: 10,
                      elevation: 4,
                    }}>
                    <FontAwesomeIcon
                      color={COLORS.title}
                      size={20}
                      name="quote-left"
                      style={{textAlign: 'center', marginBottom: 18}}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        ...FONTS.fontSatoshiRegular,
                      }}>
                      {data.text}
                    </Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <FiveStars />
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.title,
                      ...FONTS.fontSatoshiRegular,
                    }}>
                    {data.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#AAAAAA',
                      marginBottom: 15,
                      ...FONTS.fontSatoshiRegular,
                    }}>
                    {data.who}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        {/* {PopularItemsData.map((data, index) => (
          <ProductListItem
            onPress={() =>
              navigation.navigate('ProductDetail', {
                item: data,
                category: 'Appliances',
              })
            }
            key={index}
            image={data.imagePath}
            title={data.title}
            desc={data.desc}
            price={data.price}
            oldPrice={data.oldPrice}
            offer={data.offer}
          />
        ))} */}

        {/* <View
          style={{
            ...GlobalStyleSheet.container,
            backgroundColor: '#151423',
            marginTop: 15,
          }}>
          <View>
            <Text style={{...FONTS.h6, marginBottom: 5, color: COLORS.white}}>
              Top Selection
            </Text>
          </View>
          <View style={GlobalStyleSheet.row}>
            {TopSelectionData.map((data, index) => {
              return (
                <View key={index} style={GlobalStyleSheet.col50}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('Items', {type: data.type})
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
                      source={data.image}
                    />
                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          ...FONTS.font,
                          ...FONTS.fontBold,
                          color: COLORS.title,
                        }}>
                        {data.title}
                      </Text>
                      <Text style={{...FONTS.fontSm, marginTop: 2}}>
                        {data.offer}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View> */}
        <View>
          <View style={{marginTop: 20, padding: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: COLORS.title,
                marginBottom: 20,
              }}>
              Our Journal
            </Text>
            <Image
              style={{width: '100%', height: 200}}
              source={{uri: dataBlogs?.image?.src}}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: COLORS.title,
                ...FONTS.fontSatoshiBold,
              }}>
              {dataBlogs?.title}
            </Text>
            <Text style={{marginVertical: 8, ...FONTS.fontSatoshiRegular}}>
              {dateJournalCreated}
            </Text>
            {/* <Text style={{color: COLORS.title, ...FONTS.fontSatoshiRegular}}> */}
            <CustomHTML
              htmlContent={dataBlogs?.body_html}
              limit={570}
              blog_id
            />
            {/* </Text> */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  gap: 12,
                  flexDirection: 'row',
                  paddingVertical: 8,
                  paddingHorizontal: 28,
                  borderWidth: 1,
                  borderColor: COLORS.title,
                }}>
                <Text
                  style={{
                    color: COLORS.title,
                    fontSize: 12,
                    textAlign: 'center',
                    ...FONTS.fontSatoshiBold,
                  }}>
                  Continue Reading
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{padding: 18, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 22,
              marginBottom: 16,
              marginTop: 24,
              color: COLORS.title,
              ...FONTS.fontSatoshiBold,
            }}>
            Newsletter
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginVertical: 16,
              textAlign: 'center',
              color: COLORS.title,
              ...FONTS.fontSatoshiRegular,
            }}>
            Sign up to get the latest on sales, new release and More
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              width: '100%',
              paddingHorizontal: 24,
              marginBottom: 16,
              ...FONTS.fontSatoshiRegular,
            }}
            placeholder="Enter your email address"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#1A120B',
              gap: 12,
              paddingVertical: 12,
              paddingHorizontal: 24,
              flexDirection: 'row',
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSignUp}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: 'center',
                alignItems: 'center',
                ...FONTS.fontSatoshiBold,
              }}>
              Sign up
            </Text>
            <Ionicons
              name="md-arrow-forward"
              size={12}
              color="#fff"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 6,
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHome;
