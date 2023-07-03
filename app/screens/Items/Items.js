import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import { useQuery, useLazyQuery } from '@apollo/client';
import LoadingScreen from '../../components/LoadingView';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION,
  __GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION,
} from '../../graphql/queries';
import FilterModal from '../../components/screens/items/filter-product';


const Items = ({ navigation, route }) => {
  const { handle, categories, subTitle } = route.params;
  const [itemView, setItemView] = useState('grid');
  const [dataCategories, setDataCategories] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [valSearch, setValSearch] = useState('');

  const flatListRef = useRef(null);
  const {
    data,
    fetchMore,
    loading: loadingGetProducts,
  } = useQuery(GQL_GET_PRODUCT_LIST_ITEM_BY_CATEGORY_COLLECTION, {
    variables: {
      first: 5,
      handle: handle,
      after: null,
      product_filters: {
        available: true,
      },
    },
  });

  // const [{ loading: loadingSearch }] = useLazyQuery(GET_LIST_CATEGORIES, {
  //   onCompleted: ({ products }) => {
  //     const results = products?.nodes || [];
  //     setDataCategories(results);
  //   },
  // });

  // const handleSearchButton = () => {
  //   filterSearch({
  //     variables: {
  //       first: 10,
  //       query: valSearch,
  //     },
  //   });

  // const [filterByAvailability, {data: dataFilterAvailability, loading: loadingSearch}] = useLazyQuery(
  //   FILTER_PRODUCT_BY_AVAILABILITY,
  // );

  // const handleApplyFilters = (filters) => {
  //   const { availability, minPrice, maxPrice } = filters;

  //     if(availability.some((item) => item.label === "in Stock" && item.checked)) {
  //       filterByAvailability({
  //         variables: {
  //           handle: "monez",
  //           first: 10,
  //           isAvailable: true
  //         }
  //       })
  //     }
  // if (!minPrice && !maxPrice) {
  //   return true
  // }
  // Filter by price range
  // const filteredByPrice = filteredByAvailability.filter((product) => {
  //   if (!minPrice && !maxPrice) {
  //     return true; // If no price range is specified, include all products
  //   }

  //   if (minPrice && maxPrice) {
  //     return product.price >= minPrice && product.price <= maxPrice;
  //   }

  //   if (minPrice) {
  //     return product.price >= minPrice;
  //   }

  //   if (maxPrice) {
  //     return product.price <= maxPrice;
  //   }
  // });

  // setFilteredProducts(filteredByPrice);
  // };

  useEffect(() => {
    if (data) {
      setDataCategories(data?.collection?.products?.nodes || []);
    }
    // if (dataFilterAvailability) {
    //   setDataCategories(data?.collection?.products?.nodes || []);
    // }
  }, [data]);

  const handleValChange = val => {
    setValSearch(val);
  };

  const handleFilterButtonClick = () => {
    setShowInput(!showInput);
  };


  const handleLoadMore = async () => {
    const { endCursor, hasNextPage } = data?.collection?.products?.pageInfo;

    if (data && hasNextPage) {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            first: 5,
            handle: handle,
            after: endCursor,
            product_filters: {
              available: true,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              collection: {
                ...fetchMoreResult.collection,
                products: {
                  ...fetchMoreResult.collection.products,
                  nodes: [...prev?.collection.products?.nodes, ...fetchMoreResult.collection.products.nodes],
                },
              },
            };
          },
        });
      } catch (error) {
        console.error('Error fetching more products:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width: '50%', paddingHorizontal: 5 }}>
      <ProductItem
        onPress={() =>
          navigation.navigate('ProductDetail', {
            id: item.id,
          })
        }
        imgLength
        imageSrc={item?.images?.edges[0]?.node?.url}
        title={item.title}
        price={item?.variants?.nodes[0]?.price?.amount}
        oldPrice={item?.variants?.nodes[0]?.compareAtPrice?.amount}
      />
    </View>
  );
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Header
            titleLeft
            leftIcon={'back'}
            title={subTitle}
          />
        </View>
        <View style={{ height: '100%' }}>
          <FilterModal visible={showInput} onClose={() => setShowInput(false)}/>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '30%',
              marginBottom: 10,
              marginHorizontal: 17,
            }}
            onPress={handleFilterButtonClick}
          >
            <Text
              style={{
                textAlign: 'center',
                marginRight: 10,
                marginVertical: 3,
                color: 'black',
                ...FONTS.font,
              }}
            >
              Filter
            </Text>
            <AntDesignIcon color="#374957" size={20} name="filter" style={{ textAlign: 'center', marginVertical: 3 }} />
          </TouchableOpacity>
          {/* {showInput && (
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  marginBottom: 10,
                  marginHorizontal: 17,
                  color: 'black',
                }}
                placeholder="Search"
                autoFocus
                value={valSearch}
                onChangeText={handleValChange}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              ></View>
            </View>
          )} */}
          {loadingGetProducts ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
              }}
            >
              <LoadingScreen />
            </View>
          ) : dataCategories && dataCategories.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
              }}
            >
              <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Product Not Found</Text>
            </View>
          ) : (
            <FlatList
              data={dataCategories}
              renderItem={renderItem}
              ref={flatListRef}
              keyExtractor={item => String(item.id)}
              numColumns={itemView === 'grid' ? 2 : 1}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              contentContainerStyle={{
                minHeight: '100%',
                paddingHorizontal: 8,
                paddingBottom: 90,
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                isLoadingMore && (
                  <View style={{ marginBottom: 90 }}>
                    <LoadingScreen Loading2 />
                  </View>
                )
              }
              onEndReached={() => handleLoadMore()}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  columnWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    padding: 10,
    position: 'absolute',
  },
  snackbar: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
});

// Rest of the code...

export default Items;
