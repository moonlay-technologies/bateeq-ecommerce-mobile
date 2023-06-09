import React, {useState, useEffect} from 'react';
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
import {IconButton} from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants/theme';
import {ProductApi} from '../../service/shopify-api';
import LoadingScreen from '../../components/LoadingView';
import {gql, useLazyQuery} from '@apollo/client';
import { connect } from 'react-redux'
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
}`


const Search = ({navigation, ...props}) => {
    let { options } = props
  const [valSearch, setValSearch] = useState('');
  const [itemView, setItemView] = useState('grid');
  // const [isLoading, setIsLoading] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [searchProducts, {data, loading, error}] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
  );

  const handlePress = () => {
    navigation.navigate('Home');
  };

  const handleSearchButton = () => {
    const query = valSearch.toLowerCase();
    searchProducts({
      variables: {
        query,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const results = data.products.edges.map(edge => edge.node);
      setSearchResults(results);
    }
  }, [data]);

  const renderItem = ({item}) => (
    <View style={{width: '50%', paddingHorizontal: 5}}>
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductDetail', {
            item: {
              title: item.title,
              images: item?.images?.edges,
              oldPrice: item?.variants?.edges[0]?.node?.compareAtPrice?.amount,
              price: item?.variants?.edges[0]?.node?.price?.amount,
              desc: item.desc,
              variant: item?.options[0]?.values,
              colors: item?.options[1]?.values,
            },
            // category: type,
          })
        }
        imgLength
        id={item.id}
        imageSrc={item?.images?.edges[0]?.node?.url}
        title={item.title}
        desc={item.desc}
        status={item.status ? 'SALE' : null}
        price={item?.variants?.edges[0]?.node?.price?.amount}
        oldPrice={item?.variants?.edges[0]?.node?.compareAtPrice?.amount}
      />
    </View>
  );

  const handleValChange = val => {
    setValSearch(val);
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
                    {options?.totalQuantity ?? 0}
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          height: 190,
          padding: 20,
        }}>
        <Text
          style={{
            color: COLORS.title,
            fontSize: 14,
            ...FONTS.fontSatoshiBold,
            marginBottom: 8,
          }}>
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
          autoFocus={true}
          placeholder="e.g T-shirt / Dress"
          placeholderTextColor={COLORS.text}
          value={valSearch}
          onChangeText={handleValChange}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
            onPress={handleSearchButton}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.fontSatoshiBold,
                textAlign: 'center',
                alignItems: 'center',
              }}>
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
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={searchResults}
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
          // onEndReached={() => {
          // Load more data here
          // }}
        />
      )}
    </SafeAreaView>
  );
};

export default connect(({Cart})=> {
    let { options } = Cart
    return {
        options
    }
},{})(React.memo(Search));
