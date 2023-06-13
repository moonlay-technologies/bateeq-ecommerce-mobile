import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  //   ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql, useLazyQuery } from '@apollo/client';
import ProductItem from '../../components/ProductItem';
import { COLORS, FONTS } from '../../constants/theme';
import { ProductApi } from '../../service/shopify-api';
import LoadingScreen from '../../components/LoadingView';
import {connect} from "react-redux";
import {CollectionSearch} from "../../store/actions/product";
import HeaderComponent from '../../components/HeaderComponent';

const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!) {
    products(query: $query, first: 10) {
      edges {
        node {
          id
          title
          description
          images(first: 4) {
            edges {
              node {
                id
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          options(first: 2) {
            values
          }
        }
      }
    }
  }
`;


const Search = (props) => {
    let {
        options,
        CollectionSearch,
        navigation,
        search
    } = props
  const [valSearch, setValSearch] = useState('');
  const [itemView, setItemView] = useState('grid');
  const [searchResults, setSearchResults] = useState([]);

  const [searchProducts, { data, loading, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY);

  const handlePress = () => {
    navigation.navigate('Home');
  };

  const handleSearchButton = () => {
    const query = valSearch.toLowerCase();
      CollectionSearch({
          first:20,
          query
      })
  };

  useEffect(() => {
    if (data) {
      const results = data.products.edges.map(edge => edge.node);
      setSearchResults(results);
    }
  }, [data]);

  const renderItem = ({item}) => {
      return (
          <View style={{width: '50%', paddingHorizontal: 5}}>
              <ProductItem
                  onPress={() =>
                      // navigation.navigate('ProductDetail', {
                      //     item: {
                      //         title: itemName,
                      //         image: imageSrc,
                      //         oldPrice: oldPrice,
                      //         price: price,
                      //         images: images
                      //     },
                      //     category: 'Appliances',
                      // })
                      navigation.navigate('ProductDetail', {
                          item: {
                              id:item.id,
                              title: item.title,
                              images: item?.images?.nodes,
                              oldPrice: item?.variants?.nodes[0]?.compareAtPrice?.amount ?? 0,
                              price: item?.variants?.nodes[0]?.price?.amount,
                              desc: item.desc,
                              variant: item?.options[0]?.values,
                              colors: item?.options[1]?.values,
                          },
                          // category: type,
                      })
                  }
                  imgLength
                  id={item.id}
                  imageSrc={item?.images?.nodes[0]?.url}
                  title={item.title}
                  desc={item.desc}
                  status={item.status ? 'SALE' : null}
                  price={item?.variants?.nodes[0]?.price?.amount}
                  oldPrice={item?.variants?.nodes[0]?.comparpriceeAtPrice?.amount}
              />
          </View>
      )
  };

  const handleValChange = val => {
    setValSearch(val);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          icon={() => (
            <View
              style={{
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}
            >
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
        <TouchableOpacity onPress={handlePress}>
          <Image style={{ width: 70, height: 35 }} source={require('../../assets/images/logo.png')} />
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
                    {options?.totalQuantity ?? 0}
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View>
      <HeaderComponent />
      <View
        style={{
          flexDirection: 'column',
          height: 190,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontSize: 14,
            ...FONTS.fontSatoshiBold,
            marginBottom: 8,
          }}
        >
          Search Product
        </Text>
        <TextInput
          style={{
            ...FONTS.font,
            flex: 1,
            color: COLORS.title,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 5,
            marginBottom: 24,
          }}
          autoFocus
          placeholder="e.g T-shirt / Dress"
          placeholderTextColor={COLORS.text}
          value={valSearch}
          onChangeText={handleValChange}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#333333',
              gap: 12,
              paddingVertical: 12,
              paddingHorizontal: 24,
              flexDirection: 'row',
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
            }}
            onPress={handleSearchButton}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.fontSatoshiBold,
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              Search
            </Text>
            <Ionicons
              name="md-arrow-forward"
              size={12}
              color={COLORS.white}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 4,
                marginLeft: 18,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {search?.loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={search.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={itemView === 'grid' ? 2 : 1}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={10}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingHorizontal: 8,
            marginBottom: 15,
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default
connect(
    ({Cart,Product})=> {
    let { options } = Cart
    let { collections } = Product
    return {
        options,
        search: collections?.search ?? {}
    }
},
    {CollectionSearch})(Search);
