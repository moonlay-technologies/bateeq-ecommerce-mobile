import React, { useState, useEffect } from 'react';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import ProductCardStyle1 from '../../components/ProductCardStyle';
import FeaturedCard from '../../components/FeaturedCard';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { Footer } from '../../components/Footer';
import { ProductApi, CollectionsApi } from '../../service/shopify-api';
import CustomHTML from '../../components/CustomHtml';
import LoadingScreen from '../../components/LoadingView';
import {useQuery, gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {connect, useDispatch, useSelector} from 'react-redux';
import { setIsOpen } from '../../store/reducer'
import { GET_TOTAL_QUANTITY_CART } from '../../graphql/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {CartGetList, CartPutTotalQty} from "../../store/actions";
import {COLORS, FONTS} from "../../constants/theme";
import {IconButton} from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";

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

const GET_PAGE_STORY = gql`
  query getPageStory {
    page(handle: "our-story") {
      id
      title
      body
    }
  }
`;

const GET_LATEST_COLLECTION = gql`
  query getCollectionIdFromHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
      }
    }
  }
`;

const GET_BANNER_SLIDER = gql`
  query getDataImageBanner($handle: String!) {
    product(handle: $handle) {
      description
      images(first: 5) {
        edges {
          node {
            url
            id
          }
        }
      }
    }
  }
`;
const GET_LIST_CATEGORIES = gql`
  query GetProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          images(first: 4) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_MAIN_MENU_NAVIGATION = gql`
  query getDataImageBanner($handle: String!) {
    menu(handle: $handle) {
      id
      title
      handle
      items {
        id
        title
        url
        items {
          id
          title
        }
      }
    }
  }
`;

const MainHome = (props) => {
  let { navigation,options,CartPutTotalQty,CartGetList } = props
  console.log({CartGetList})
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [dataAllProduct, setDataAllProduct] = useState([]);
  const [pageStory, setPageStory] = useState(null);
  const [dataLatestCollection, setDataLatestCollection] = useState(null);
  const [dataBanner, setDataBanner] = useState([]);
  const [imageCollection, setImageCollection] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const navigations = useNavigation();

  const toggleSubMenu = menuId => {
    setActiveSubMenu(prevActiveMenu => (prevActiveMenu === menuId ? null : menuId));
  };

  const { data, loading } = useQuery(GET_PAGE_STORY);
  const { data: latestCollectionData, loading: latestCollectionLoading } = useQuery(GET_LATEST_COLLECTION, {
    variables: {
      handle: 'latest-collection',
    },
  });
  const { data: dataImageBanner, loading: dataImageBannerLoading } = useQuery(GET_BANNER_SLIDER, {
    variables: {
      handle: 'banner',
    },
  });
  const { data: dataImageCollection } = useQuery(GET_BANNER_SLIDER, {
    variables: {
      handle: 'slider-collection',
    },
  });
  const { data: dataListCategories } = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: 'categories',
    },
  });
  const { data: getAllProduct } = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: '',
    },
  });
  const { data: dataSideMenuNavigation } = useQuery(GET_MAIN_MENU_NAVIGATION, {
    variables: {
      first: 5,
      handle: 'main-menu',
    },
  });

  const {data: cartData} = useQuery(GET_TOTAL_QUANTITY_CART, {
    variables:{
      id: options?.cartId
    }
  })

  useEffect(()=> {
    CartGetList({first:50,last:0})
  },[])
  useEffect(() => {
    if (data) {
      setPageStory(data.page);
    }
    if (getAllProduct) {
      setDataAllProduct(getAllProduct.products.edges);
    }
    if (latestCollectionData) {
      setDataLatestCollection(latestCollectionData.collection);
    }

    if (dataImageBanner) {
      setDataBanner(dataImageBanner.product.images.edges);
    }

    if (dataImageCollection) {
      setImageCollection(dataImageCollection.product.images.edges);
    }
    if (dataListCategories) {
      setDataCategories(dataListCategories.products.edges);
    }
  }, [
    data,
    latestCollectionData,
    dataImageBanner,
    dataListCategories,
    dataImageCollection,
    getAllProduct
  ]);

  useEffect(()=> {
    if(cartData) {
      CartPutTotalQty({totalQuantity:cartData?.cart?.totalQuantity})
    }
  },[cartData])

  useEffect(() => {
    // getDataProducts();
    // getDataCustomCollections();
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
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: error?.originalError?.message || 'something went wrong',
        });
      });
  };

  const renderSubMenu = subMenu => {
    return subMenu.map(item => (
      <TouchableOpacity style={styles.subMenuItem} key={item.id} onPress={() => toggleSubMenu(item.id)}>
        <Text style={styles.subMenuText}>{item.title}</Text>
        {item.items && activeSubMenu === item.id && (
          <View style={styles.nestedSubMenuContainer}>{renderSubMenu(item.items)}</View>
        )}
      </TouchableOpacity>
    ));
  };

  const renderMainMenu = () => {
    return dataSideMenuNavigation?.menu?.items?.map(item => (
      <View key={item?.id} style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton} onPress={() => toggleSubMenu(item.id)}>
          <Text style={styles.menuText}>{item?.title}</Text>
        </TouchableOpacity>
        {item.items && activeSubMenu === item.id && (
          <View style={styles.subMenuContainer}>{renderSubMenu(item?.items)}</View>
        )}
      </View>
    ));
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
          onPress={() => {
            if('openDrawer' in navigations && typeof (navigations?.openDrawer) !== 'undefined') {
              navigations?.openDrawer()
            }
          }}
          // onPress={handleDrawer}
        />
        <TouchableOpacity>
          <Image
            style={{width: 70, height: 35}}
            source={require('../../assets/images/logo.png')}
          />
        </TouchableOpacity>
        {
          options?.loading ? <Text>Loading...</Text> : (
              <IconButton
                  onPress={() => navigation.navigate('Cart')}
                  icon={() => (
                      <View>
                        <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
                        {options?.totalQuantity > 0 && <View
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
                            {options?.totalQuantity}
                          </Text>
                        </View> }
                      </View>
                  )}
                  size={25}
              />
          )
        }
      </View>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
      <View style={styles.menuContainer}>{renderMainMenu()}</View>
      {/* </ScrollView> */}
      <ScrollView>
        {dataImageBannerLoading && <LoadingScreen type="circle" />}
        <Swiper
          autoplay
          autoplayTimeout={6}
          height="auto"
          dotColor="rgba(255,255,255,.3)"
          activeDotColor={COLORS.white}
          paginationStyle={{ bottom: 10 }}
        >
          {dataBanner.map(data => {
            return (
              <View key={data.node.id} style={{ zIndex: 1 }}>
                <LinearGradient
                  colors={['transparent', 'transparent', 'rgba(0,0,0,.4)']}
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                  }}
                />
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: 7 / 4,
                  }}
                  source={{ uri: data?.node?.url }}
                />
              </View>
            );
          })}
        </Swiper>
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.title,
              marginBottom: 16,
              ...FONTS.fontSatoshiBold,
            }}
          >
            {pageStory?.title}
          </Text>
          {loading ? <LoadingScreen type="circle" /> : <CustomHTML htmlContent={pageStory?.body} blog_id />}
          <TouchableOpacity
            onPress={() => navigation.navigate('PageOurStory', { pageStory })}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: 'black',
            }}
          >
            <Text
              style={{
                color: COLORS.title,
                ...FONTS.fontSatoshiRegular,
                fontSize: 16,
              }}
            >
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

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 10,
          }}
        />
        <View>
          {isLoading ? (
            <LoadingScreen type="circle" />
          ) : (
            <View style={{ marginBottom: 40, paddingHorizontal: 25 }}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {dataAllProduct?.slice(0, 4) &&
                  dataAllProduct?.slice(0, 4)?.map(product => {
                    return (
                      <View
                        key={product.node.id}
                        style={{
                          width: 150,
                          marginRight: 10,
                          marginBottom: 20,
                        }}
                      >
                        <ProductCardStyle1
                          onPress={() =>
                            navigation.navigate('ProductDetail', {
                              id: product.node.id,
                            })
                          }
                          imageSrc={product.node.images.edges[0].node.url}
                          title={product.node.title}
                          price={product?.node?.variants?.edges[0].node.price.amount}
                          oldPrice={product?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount}
                          // offer={data.offer}
                        />
                      </View>
                    );
                  })}
                {/* </ScrollView> */}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Items', { query: '' })}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    width: 200,
                    height: 48,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      marginRight: 2,
                    }}
                  >
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {latestCollectionLoading ? (
          <LoadingScreen type="circle" />
        ) : (
          <View
            style={{
              ...GlobalStyleSheet.container,
              borderTopColor: COLORS.borderColor,
            }}
          >
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                marginBottom: 16,
                fontSize: 18,
                textAlign: 'center',
              }}
            >
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
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.title,
              marginBottom: 20,
            }}
          >
            Our Category
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {dataCategories?.map(item => (
              <View style={{ width: 180, padding: 10 }} key={item.node.id}>
                <FeaturedCard
                  image={item.node.images.edges[0]?.node.url}
                  title={item.node.description}
                  dataCollection={dataCategories}
                  imagePath
                  categories
                />
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Swiper
            autoplay
            autoplayTimeout={6}
            height="auto"
            dotColor="rgba(255,255,255,.3)"
            activeDotColor={COLORS.white}
            paginationStyle={{ bottom: 10 }}
          >
            {imageCollection.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Items', { query: 'Miwiti' })}
                  key={data.node.id}
                  style={{ zIndex: 1 }}
                >
                  <LinearGradient
                    colors={['transparent', 'transparent', 'rgba(0,0,0,.4)']}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      zIndex: 1,
                    }}
                  />
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      aspectRatio: 7 / 4,
                    }}
                    source={{ uri: data?.node?.url }}
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black color
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
                        marginHorizontal: -52,
                      }}
                    >
                      MIWITI
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigations.navigate('Items', { query: 'Miwiti' })}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        marginTop: 10,
                      }}
                    >
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
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 2,
    zIndex: 50,
    // backgroundColor: '#f1f1f1',
  },
  menuItem: {
    position: 'relative',
  },
  menuItemButton: {
    padding: 10,
  },
  menuText: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  subMenuContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: 120,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
    zIndex: 50,
  },
  nestedSubMenuContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    fontSize: 14,
    color: 'black',
  },
};

export default connect(({Cart})=> {
  let {options} = Cart
  return { options }
},{CartPutTotalQty,CartGetList})(React.memo(MainHome));
