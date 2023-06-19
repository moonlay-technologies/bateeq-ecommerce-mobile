import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import {
  GET_TOTAL_QUANTITY_CART,
  GET_PAGES,
  GET_BANNER_SLIDER,
  GET_COLLECTIONS_SLIDER,
  GET_MAIN_MENU_NAVIGATION,
} from '../../graphql/queries';

import { CartGetList, CartPutTotalQty, LoadUsers, CreateCheckout } from '../../store/actions';
import { COLORS, FONTS } from '../../constants/theme';
import LatestCollections from '../../components/screens/home/latest-collections';
import OurCategory from '../../components/screens/home/our-category';
import OurStory from '../../components/screens/home/our-story';
import HeaderComponent from '../../components/HeaderComponent';
import LoadingScreen from '../../components/LoadingView';
import { Footer } from '../../components/Footer';

function MainHome(props) {
  const { navigation, options, CartPutTotalQty: cartPutTotalQty, CartGetList: cartGetList } = props;

  const [pageStory, setPageStory] = useState(null);
  const [dataBanner, setDataBanner] = useState([]);
  const [imageSliderCollection, setImageSliderCollection] = useState([]);

  const navigations = useNavigation();

  const { data: dataPages } = useQuery(GET_PAGES, {
    variables: {
      handle: 'our-story',
    },
  });

  const { data: dataImageBanner, loading: dataImageBannerLoading } = useQuery(GET_BANNER_SLIDER, {
    variables: {
      handle: 'banner',
    },
  });
  const { data: dataSliderCollectionsById } = useQuery(GET_COLLECTIONS_SLIDER, {
    variables: {
      ids: ['gid://shopify/Collection/441585107227', 'gid://shopify/Collection/441586286875'],
    },
  });

  const { data: dataSideMenuNavigation } = useQuery(GET_MAIN_MENU_NAVIGATION, {
    variables: {
      first: 5,
      handle: 'main-menu',
    },
  });

  const { data: cartData } = useQuery(GET_TOTAL_QUANTITY_CART, {
    variables: {
      id: options?.cartId,
    },
  });

  useEffect(() => {
    cartGetList({ first: 50, last: 0 });
  }, []);

  useEffect(() => {
    if (dataPages) {
      setPageStory(dataPages.page);
    }

    if (dataImageBanner) {
      setDataBanner(dataImageBanner.product.images.edges);
    }

    if (dataSliderCollectionsById) {
      setImageSliderCollection(dataSliderCollectionsById.nodes);
    }
  }, [dataPages, dataImageBanner, dataSliderCollectionsById]);
  useEffect(() => {
    if (cartData) {
      cartPutTotalQty({ totalQuantity: cartData?.cart?.totalQuantity });
    }
  }, [cartData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <HeaderComponent dataListMenu={dataSideMenuNavigation} dataPageStory={pageStory} showListMenu />
      <ScrollView>
        {dataImageBannerLoading && <LoadingScreen Loading3 />}
        <Swiper
          autoplay
          autoplayTimeout={6}
          height="auto"
          dotColor="rgba(255,255,255,.3)"
          activeDotColor={COLORS.white}
          removeClippedSubviews={false}
          paginationStyle={{ bottom: 10 }}
        >
          {dataBanner.map(d => {
            return (
              <View key={d.node.id} style={{ zIndex: 1 }}>
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
                  source={{ uri: d?.node?.url }}
                />
              </View>
            );
          })}
        </Swiper>

        <OurStory
          style={{
            marginBottom: 10,
            paddingVertical: 20,
          }}
          onRedirect={({ data }) => {
            navigation.navigate('PagesInShopify', { dataPages: data });
          }}
        />

        <LatestCollections />

        <OurCategory />

        <View style={{ marginTop: 20 }}>
          <Swiper
            autoplay
            height="auto"
            dotColor="rgba(255,255,255,.3)"
            autoplayTimeout={6}
            activeDotColor={COLORS.white}
            removeClippedSubviews={false}
            paginationStyle={{ bottom: 10 }}
          >
            {imageSliderCollection.map(i => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Items', { query: i.title })}
                  key={i.id}
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
                      resizeMode: 'cover',
                    }}
                    source={{ uri: i?.image?.url }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
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
                        fontWeight: '200',
                        fontSize: 36,
                        letterSpacing: 16,
                        marginHorizontal: -30,
                      }}
                    >
                      {i.title}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.fontSatoshiLight,
                        color: COLORS.white,
                        textAlign: 'center',
                        fontWeight: '200',
                        fontSize: 10,
                        justifyContent: 'center',
                      }}
                    >
                      {i?.description}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigations.navigate('Items', { query: i.title })}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.fontSatoshiBold,
                          color: COLORS.white,
                          paddingVertical: 4,
                          paddingHorizontal: 4,
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
        <Footer dataPagesStory={pageStory} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(
  ({ Cart }) => {
    const { options, lists } = Cart;

    return { options, lists };
  },
  { CartPutTotalQty, CartGetList, LoadUsers, CreateCheckout }
)(React.memo(MainHome));
