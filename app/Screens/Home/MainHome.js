import React, {useState, useEffect} from 'react';
import {
  Image,
  // ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  // TextInput,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../constants/theme';
import Swiper from 'react-native-swiper';
import ProductCardStyle1 from '../../components/ProductCardStyle1';
import FeaturedCard from '../../components/FeaturedCard';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {Footer} from '../../components/Footer';
import {ProductApi} from '../../service/shopify-api';
import CustomHTML from '../../components/CustomHtml';
import LoadingScreen from '../../components/LoadingView';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {
  GET_PAGE_STORY,
  GET_LATEST_COLLECTION,
  GET_BANNER_SLIDER,
  GET_COLLECTIONS_SLIDER,
  GET_LIST_CATEGORIES,
  GET_MAIN_MENU_NAVIGATION,
} from '../../service/graphql/query/main-home';
import MenuListHeader from '../Components/MenuListHeader';
import {gqlError} from '../../utils/error-handling';

const MainHome = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [dataAllProduct, setDataAllProduct] = useState([]);
  const [pageStory, setPageStory] = useState(null);
  const [dataLatestCollection, setDataLatestCollection] = useState(null);
  const [dataBanner, setDataBanner] = useState([]);
  const [imageSliderCollection, setImageSliderCollection] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigations = useNavigation();

  const onError = err => {
    gqlError({error: err, Toast});
  };

  const {data, loading} = useQuery(GET_PAGE_STORY, {
    variables: {
      handle: 'our-story',
    },
  });

  const {data: latestCollectionData, loading: latestCollectionLoading} =
    useQuery(GET_LATEST_COLLECTION, {
      variables: {
        handle: 'latest-collection',
      },
    });

  const {data: dataImageBanner, loading: dataImageBannerLoading} = useQuery(
    GET_BANNER_SLIDER,
    {
      variables: {
        handle: 'banner',
      },
    },
  );
  const {data: dataSliderCollectionsById} = useQuery(GET_COLLECTIONS_SLIDER, {
    variables: {
      ids: [
        'gid://shopify/Collection/441585107227',
        'gid://shopify/Collection/441586286875',
      ],
    },
  });
  const {data: dataListCategories} = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: 'categories',
    },
  });
  const {data: getAllProduct} = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: '',
    },
  });
  const {data: dataSideMenuNavigation} = useQuery(GET_MAIN_MENU_NAVIGATION, {
    variables: {
      first: 5,
      handle: 'main-menu',
    },
  });

  useEffect(() => {
    if (data) {
      setPageStory(data.page);
    }
    if (getAllProduct) {
      setDataAllProduct(getAllProduct.products.nodes);
    }
    if (latestCollectionData) {
      setDataLatestCollection(latestCollectionData.collection);
    }

    if (dataImageBanner) {
      setDataBanner(dataImageBanner.product.images.edges);
    }

    if (dataSliderCollectionsById) {
      setImageSliderCollection(dataSliderCollectionsById.nodes);
    }
    if (dataListCategories) {
      setDataCategories(dataListCategories.products.nodes);
    }
  }, [
    data,
    latestCollectionData,
    dataImageBanner,
    dataListCategories,
    dataSliderCollectionsById,
    getAllProduct,
  ]);

  useEffect(() => {
    getDataProducts();
  }, []);

  const getDataProducts = () => {
    setIsLoading(true);
    ProductApi.get()
      .then(res => {
        setIsLoading(false);
        setProductData(res.products);
      })
      .catch(error => {
        setIsLoading(false);
        onError(error);
      });
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
        }}>
        <IconButton
          icon={() => (
            <View
              style={{
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
          onPress={() => navigation?.openDrawer()}
        />
        <View style={{zIndex: 1}}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              style={{width: 70, height: 35}}
              source={require('../../assets/images/logo.png')}
            />
          </TouchableOpacity>
        </View>
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

      <MenuListHeader
        menuItems={dataSideMenuNavigation}
        navigation={navigation}
        dataStory={pageStory}
      />
      <ScrollView>
        {dataImageBannerLoading && <LoadingScreen Loading3 />}
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          height={'auto'}
          dotColor={'rgba(255,255,255,.3)'}
          activeDotColor={COLORS.white}
          removeClippedSubviews={false}
          paginationStyle={{bottom: 10}}>
          {dataBanner.map(data => {
            return (
              <View key={data.node.id} style={{zIndex: 1}}>
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
                    aspectRatio: 7 / 4,
                  }}
                  source={{uri: data?.node?.url}}
                />
              </View>
            );
          })}
        </Swiper>
        {loading ? (
          <LoadingScreen Loading3 />
        ) : (
          <View
            style={{
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.title,
                marginBottom: 16,
                ...FONTS.fontSatoshiBold,
              }}>
              {pageStory?.title}
            </Text>

            <CustomHTML htmlContent={pageStory?.body} blog_id />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PageOurStory', {pageStory: pageStory})
              }
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
        )}

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 18,
            flexWrap: 'wrap',
            paddingBottom: 10,
          }}></View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {isLoading ? (
            <LoadingScreen Loading3 />
          ) : (
            <View
              style={{
                marginBottom: 40,
                paddingHorizontal: 25,
              }}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {dataAllProduct?.slice(0, 4) &&
                  dataAllProduct?.slice(0, 4)?.map(product => {
                    return (
                      <View
                        key={product.id}
                        style={{
                          width: '40%',
                          marginRight: 10,
                          marginBottom: 20,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}>
                        <ProductCardStyle1
                          onPress={() =>
                            navigation.navigate('ProductDetail', {
                              item: {
                                id: product.id,
                                title: product.title,
                                images: product.images.edges,
                                oldPrice:
                                  product?.variants?.edges[0]?.node
                                    ?.compareAtPrice?.amount,
                                price:
                                  product.variants.edges[0].node.price.amount,
                                desc: product.descriptionHtml,
                                variant: product.variants.edges,
                              },
                              // category : "Appliances"
                            })
                          }
                          imageSrc={product.images.edges[0].node.url}
                          title={product.title}
                          price={product?.variants?.edges[0].node.price.amount}
                          oldPrice={
                            product?.variants?.edges[0]?.node?.compareAtPrice
                              ?.amount
                          }
                          // offer={data.offer}
                        />
                      </View>
                    );
                  })}
                {/* </ScrollView> */}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Items', {query: ''})}
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
          )}
        </View>
        {latestCollectionLoading ? (
          <LoadingScreen Loading3 />
        ) : (
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
              {dataLatestCollection?.title}
            </Text>
            <FeaturedCard
              image={dataLatestCollection?.image?.url}
              title={dataLatestCollection?.description}
              dataCollection={dataLatestCollection}
              hiddenBtn
            />
          </View>
        )}
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
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.title,
              marginBottom: 20,
            }}>
            Our Category
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {dataCategories?.map(item => (
              <View style={{width: 180, padding: 10}} key={item.id}>
                <FeaturedCard
                  image={item.images.edges[0]?.node.url}
                  title={item.description}
                  dataCollection={dataCategories}
                  imagePath
                  categories
                />
              </View>
            ))}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Swiper
            autoplay={true}
            height={'auto'}
            dotColor={'rgba(255,255,255,.3)'}
            autoplayTimeout={6}
            activeDotColor={COLORS.white}
            removeClippedSubviews={false}
            paginationStyle={{bottom: 10}}>
            {imageSliderCollection.map(data => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Items', {query: data.title})
                  }
                  key={data.id}
                  style={{zIndex: 1}}>
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
                      aspectRatio: 7 / 4,
                      resizeMode: 'cover',
                    }}
                    source={{uri: data?.image?.url}}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
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
                        fontWeight: '200',
                        fontSize: 36,
                        letterSpacing: 16,
                        marginHorizontal: -30,
                      }}>
                      {data.title}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.fontSatoshiLight,
                        color: COLORS.white,
                        textAlign: 'center',
                        fontWeight: '200',
                        fontSize: 10,
                        justifyContent: 'center',
                      }}>
                      {data?.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigations.navigate('Items', {query: data.title})
                      }
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          ...FONTS.fontSatoshiBold,
                          color: COLORS.white,
                          paddingVertical: 4,
                          paddingHorizontal: 4,
                        }}>
                        SHOP NOW
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>
        <Footer dataPagesStory={pageStory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHome;
