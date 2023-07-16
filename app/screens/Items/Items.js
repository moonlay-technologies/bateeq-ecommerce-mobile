import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import ProductItem from '../../components/ProductItem';
import pic1 from '../../assets/images/product/pic1.jpg';
import pic2 from '../../assets/images/product/pic2.jpg';
import pic3 from '../../assets/images/product/pic3.jpg';
import pic4 from '../../assets/images/product/pic4.jpg';
import pic5 from '../../assets/images/product/pic5.jpg';
import pic6 from '../../assets/images/product/pic6.jpg';
import pic7 from '../../assets/images/product/pic7.jpg';
import pic8 from '../../assets/images/product/pic8.jpg';
import { Snackbar } from 'react-native-paper';
import MobilesData from '../../JSON/Mobiles.json';
import ElectronicsData from '../../JSON/Electronics.json';
import FashionData from '../../JSON/Fashion.json';
import FurnitureData from '../../JSON/Furniture.json';
import GroceryData from '../../JSON/Grocery.json';
import AppliancesData from '../../JSON/Appliances.json';
import BooksToysData from '../../JSON/BooksToys.json';
import { useQuery, useLazyQuery } from '@apollo/client';
import LoadingScreen from '../../components/LoadingView';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { GET_LIST_CATEGORIES } from '../../graphql/queries';

const ProductData = [
  {
    image: pic1,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic2,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic3,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
    status: 'Trending',
  },
  {
    image: pic4,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic5,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic6,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
    status: 'Sale',
  },
  {
    image: pic7,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
  {
    image: pic8,
    title: 'Peter England Causual',
    desc: 'Printed Longline Pure Cotteon T-shirt',
    price: '$151.15',
    oldPrice: '$255.11',
    rating: '4.2',
    reviews: '245',
  },
];

// const discountFilterData = [
//   {
//     selected: false,
//     title: '50% or more',
//   },
//   {
//     selected: false,
//     title: '30% or more',
//   },
//   {
//     selected: false,
//     title: '40% or more',
//   },
//   {
//     selected: false,
//     title: '60% or more',
//   },
//   {
//     selected: false,
//     title: '70% or more',
//   },
// ];
// const brandFilterData = [
//   {
//     selected: true,
//     title: 'Roadster',
//   },
//   {
//     selected: true,
//     title: 'Peter England',
//   },
//   {
//     selected: true,
//     title: 'Flying Machine',
//   },
//   {
//     selected: true,
//     title: 'Killer',
//   },
//   {
//     selected: true,
//     title: "Levi's",
//   },
//   {
//     selected: true,
//     title: 'Puma',
//   },
//   {
//     selected: true,
//     title: 'Wildcraft',
//   },
//   {
//     selected: true,
//     title: 'Ndet',
//   },
//   {
//     selected: true,
//     title: 'Woodland',
//   },
// ];

const Items = ({ navigation, route }) => {
  const { type, query, categories, colletionTitle } = route.params;
  const [itemView, setItemView] = useState('grid');
  const [dataCategories, setDataCategories] = useState([]);
  const [dataCollections, setDataCollection] = useState([]);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [valSearch, setValSearch] = useState('');

  const flatListRef = useRef(null);
  const Products =
    type == 'Mobiles'
      ? MobilesData.items
      : type == 'Electronics'
      ? ElectronicsData.items
      : type == 'Furniture'
      ? FurnitureData.items
      : type == 'Grocery'
      ? GroceryData.items
      : type == 'Dress'
      ? AppliancesData.items
      : type == 'Bottom'
      ? BooksToysData.items
      : type == 'Top'
      ? FashionData.items
      : ProductData;

  const [itemData, setItemData] = useState(Products);

  const {
    data,
    fetchMore,
    loading: loadingGetProducts,
  } = useQuery(GET_LIST_CATEGORIES, {
    variables: {
      first: 5,
      query: valSearch || query,
      after: null,
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
      setDataCategories(data?.products?.nodes || []);
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

  const handleItemLike = val => {
    const items = itemData.map(data => {
      if (val === data.id) {
        if (data.isLike) {
          setSnackText('Item removed to Favourite.');
        } else {
          setSnackText('Item add to Favourite.');
        }
        setIsSnackbar(true);
        return { ...data, isLike: !data.isLike };
      }
      return data;
    });
    setItemData(items);
  };

  const handleLoadMore = async () => {
    const { endCursor, hasNextPage } = data?.products?.pageInfo;

    if (data && hasNextPage) {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            first: 5,
            query: query,
            after: endCursor,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              products: {
                ...fetchMoreResult.products,
                nodes: [...prev?.products?.nodes, ...fetchMoreResult.products.nodes],
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
        desc={item.description}
        status={item.status ? 'SALE' : null}
        price={item?.variants?.edges[0]?.node?.price?.amount}
        oldPrice={item?.variants?.edges[0]?.node?.compareAtPrice?.amount}
        isLike={item.isLike}
        handleItemLike={handleItemLike}
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
            title={categories ? query : colletionTitle ? colletionTitle : query === '' ? 'All Product' : query}
          />
        </View>
        <View style={{ height: '100%' }}>
          {/* <FilterPopover onApplyFilters={handleApplyFilters}/> */}
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
          {showInput && (
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
          )}
          { loadingGetProducts ? (
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
        <Snackbar
          visible={isSnackbar}
          duration={3000}
          onDismiss={() => setIsSnackbar(false)}
          action={{
            label: 'Wishlist',
            onPress: () => {
              navigation.navigate('Wishlist');
            },
          }}
        >
          {snackText}
        </Snackbar>
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
