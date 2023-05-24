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
import {ProductApi, CollectionsApi} from '../../service/shopify-api';
import CustomHTML from '../../components/CustomHtml';
import LoadingScreen from '../../components/LoadingView';
import {useQuery, gql} from '@apollo/client';

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
          images(first: 1) {
            edges {
              node {
                url
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

const mainMenu = [
  {
    id: 1,
    title: 'SHOP',
    url: '#',
    subMenu: [
      {id: 1, title: 'Submenu 1', url: '#'},
      {id: 2, title: 'Submenu 2', url: '#'},
    ],
  },
  {
    id: 3,
    title: 'BATEEQ HOM',
    url: '#',
    subMenu: [
      {id: 1, title: 'Submenu 1', url: '#'},
      {id: 2, title: 'Submenu 2', url: '#'},
    ],
  },
  {
    id: 4,
    title: 'SALE',
    url: '#',
    subMenu: [
      {id: 1, title: 'Submenu 1', url: '#'},
      {id: 2, title: 'Submenu 2', url: '#'},
    ],
  },
  {
    id: 5,
    title: 'OURSTORY',
    url: '#',
    subMenu: [
      {id: 1, title: 'Submenu 1', url: '#'},
      {id: 2, title: 'Submenu 2', url: '#'},
    ],
  },
];

const MainHome = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [dataCustomCollection, setDataCustomCollection] = useState([]);
  const [pageStory, setPageStory] = useState(null);
  const [dataLatestCollection, setDataLatestCollection] = useState(null);
  const [dataBanner, setDataBanner] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuToggle = itemId => {
    console.log('itemsId', itemId);
    setActiveSubMenu(prevActiveSubMenu =>
      prevActiveSubMenu === itemId ? null : itemId,
    );
  };

  const {data, loading} = useQuery(GET_PAGE_STORY);
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
  const {data: dataListCategories} = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: 'categories',
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
    if (latestCollectionData) {
      setDataLatestCollection(latestCollectionData.collection);
    }

    if (dataImageBanner) {
      setDataBanner(dataImageBanner.product.images.edges);
    }

    if (dataListCategories) {
      setDataCategories(dataListCategories.products.edges);
    }
  }, [data, latestCollectionData, dataImageBanner, dataListCategories]);

  useEffect(() => {
    getDataProducts();
    getDataCustomCollections();
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
        console.log('error', error);
      });
  };

  const getDataCustomCollections = () => {
    CollectionsApi.get()
      .then(res => {
        setDataCustomCollection(
          res.custom_collections.map(collection => ({
            id: collection?.id,
            title: collection?.title,
          })),
        );
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const handlePress = () => {
    navigation.navigate('Home');
  };

  const renderSubMenu = subMenu => {
    return subMenu.map(item => (
      <TouchableOpacity style={styles.subMenuItem} key={item?.id}>
        <Text style={styles.subMenuText}>{item?.title}</Text>
      </TouchableOpacity>
    ));
  };

  const renderMainMenu = () => {
    return dataSideMenuNavigation?.menu?.items?.map(item => (
      <View key={item?.id} style={styles.menuItem}>
        <TouchableOpacity
          style={styles.menuItemButton}
          onPress={() => handleSubMenuToggle(item?.id)}>
          <Text style={styles.menuText}>{item?.title}</Text>
        </TouchableOpacity>
        {activeSubMenu === item.id && item.items && (
          <View style={styles.subMenuContainer}>
            {renderSubMenu(item?.items)}
          </View>
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
          onPress={() => navigation.openDrawer()}
        />
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={{width: 70, height: 35}}
            source={require('../../assets/images/logo.png')}
          />
        </TouchableOpacity>
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
      <View style={styles.menuContainer}>{renderMainMenu()}</View>
      <ScrollView>
        {dataImageBannerLoading && <LoadingScreen Loading2 />}
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          height={'auto'}
          dotColor={'rgba(255,255,255,.3)'}
          activeDotColor={COLORS.white}
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
        <View
          style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: COLORS.title,
              marginBottom: 16,
              ...FONTS.fontSatoshiBold,
            }}>
            {pageStory?.title}
          </Text>
          {loading ? (
            <LoadingScreen Loading2 />
          ) : (
            <CustomHTML htmlContent={pageStory?.body} blog_id />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('PageOurStory', {pageStory})}
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

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 18,
            paddingBottom: 10,
          }}></View>
        <View>
          {isLoading ? (
            <LoadingScreen Loading2 />
          ) : (
            <View style={{marginBottom: 40, paddingHorizontal: 25}}>
              <View
                style={{
                  marginBottom: 25,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
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
                  onPress={() =>
                    navigation.navigate('Items', {type: 'Fashion'})
                  }
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
          <LoadingScreen Loading2 />
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
              dataCollection={dataCustomCollection}
              hiddenBtn
            />
          </View>
        )}
        <View></View>
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
            {dataCategories.map(item => (
              <View style={{width: 180, padding: 10}} key={item.node.id}>
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
        <View style={{marginTop: 20}}>
          <Swiper
            autoplay={true}
            autoplayTimeout={6}
            height={'auto'}
            dotColor={'rgba(255,255,255,.3)'}
            activeDotColor={COLORS.white}
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
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    zIndex: 2,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    fontSize: 14,
    color: 'black',
  },
};

export default MainHome;
