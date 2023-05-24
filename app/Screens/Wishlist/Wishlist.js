import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  // ScrollView,
  View,
  Text,
  TouchableOpacity,
  // Image,
  FlatList,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {CollectionsApi, CountApi, ProductApi} from '../../service/shopify-api';
import ItemCard from '../../components/ItemCard';
import {COLORS, FONTS} from '../../constants/theme';
import HeaderBateeq from '../../components/Headers/HeaderBateeq';

// const WishlistData = [
//   {
//     id: '1',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/i8iimk6z91.jpg',
//     subCategory: 'WOMEN - LS - REGULER',
//     itemName: 'LONG CAPE POLYESTER PRINT/FW747-19',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '2',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/kvSJRPi697.jpg',
//     subCategory: 'WOMEN - LS - REGULER',
//     itemName: 'LONG CAPE POLYESTER PRINT/FW106-20/NAVY',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '3',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/bRgQTb9y28.jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'REG L/S COTTON PRINT/SS157-19',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '4',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/7kKTOrVP28.jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'GAURI SWEATERSHIRT 078',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '5',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/bc6Dl4eS27.jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'MAEVE SHIRT CAKIYAR 273',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '6',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/0Qc2bSXH17.jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'REA TROUSERS CAKIYAR 320JACQUARD NALIKA 011',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '7',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/d5xWQRE142(2).jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'LOKA SHIRT',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
//   {
//     id: '8',
//     image:
//       'https://combateeqshopstorage.blob.core.windows.net/bateeqimagecontainerprd/NxnuGE0e27(1).jpg',
//     subCategory: 'MEN - LS - REGULER',
//     itemName: 'JANE DRESS KAMALA',
//     price: 'Rp792,000',
//     oldPrice: 'Rp1,079,200',
//     rating: '4.5',
//     isLike: true,
//   },
// ];

// const GET_COLLECTION_BY_HANDLE = gql`
//   query($handle: String!) {
//     collectionByHandle(handle: $handle) {
//       id
//       title
//       description
//       products(first: 10) {
//         edges {
//           node {
//             id
//             title
//             description
//             priceRange {
//               minVariantPrice {
//                 amount
//                 currencyCode
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const Wishlist = () => {
  const [productData, setProductData] = useState(null);
  const [countData, setCountData] = useState(null);
  // const [productsData, setProductsData] = useState(WishlistData);
  const [itemView, setItemView] = useState('grid');
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackText, setSnackText] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState({
    collection_id: 443503575323,
  });

  // const client = new GraphQLClient(
  //   'https://bateeqshop.myshopify.com/api/2021-04/graphql.json',
  // );

  // client
  //   .request(COLLECTION_QUERY)
  //   .then(data => console.log('datahh', data))
  //   .catch(error => console.error(error));

  // useEffect(() => {
  //   getDataProducts();
  //   getDataCount();
  // }, []);

  // const getDataProducts = () => {
  //   setIsLoading(true);
  //   ProductApi.get(collectionId)
  //     .then(res => {
  //       console.log('resss collections', res.products.map((data) => data.options[0].values ));
  //       // console.log(res.products[0].images.map(src => src.src));
  //       setIsLoading(false);
  //       setProductData(res.products);
  //     })
  //     .catch(error => {
  //       setIsLoading(false);
  //       console.log('errorrr', error);
  //     });
  // };

  // const getDataCount = () => {
  //   CountApi.get()
  //     .then(res => {
  //       setCountData(res.count);
  //     })
  //     .catch(error => {
  //       console.log('errorrr', error);
  //     });
  // };

  // const renderItem = ({item}) => (
  //   <View
  //     style={{
  //       width: itemView == 'list' ? '100%' : '50%',
  //       paddingHorizontal: 10,
  //       marginBottom: 8,
  //     }}>
  //     <ItemCard
  //       listView={itemView == 'list' ? true : false}
  //       id={item.id}
  //       subCategory="MEN - LS - REGULER"
  //       imageSrc={item.images[0].src}
  //       images={item.images}
  //       price={item.variants[0].price}
  //       oldPrice={item.variants[0].compare_at_price}
  //       title={item.title}
  //       description={item.description}
  //       shopBtn={false}
  //       itemName={item.title}
  //     />
  //   </View>
  // );

  // const handleLike = id => {
  //   let temp = productsData.map((data, index) => {
  //     if (id === data.id) {
  //       if (data.isLike) {
  //         setSnackText('Item removed to Favourite.');
  //       } else {
  //         setSnackText('Item add to Favourite.');
  //       }
  //       setIsSnackbar(true);
  //       return {...data, isLike: !data.isLike};
  //     }
  //     return data;
  //   });
  //   setProductsData(temp);
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <HeaderBateeq />
      <Text
        style={{
          ...FONTS.fontSatoshiBold,
          fontSize: 24,
          color: COLORS.title,
          padding: 20,
        }}>
        Favourite
      </Text>
      {/* <ScrollView
        contentContainerStyle={{
          paddingTop: 18,
        }}> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}> */}
      <View style={{justifyContent: 'center', alignItems: 'center', height: "70%"}}>
        <Text
          style={{
            ...FONTS.fontSatoshiBold,
            color: COLORS.title,
            marginTop: 5,
            textAlign: 'center',
          }}>
          Under Maintenace, OnProgress . . .
        </Text>
      </View>
      {/* <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '30%',
            marginBottom: 10,
            marginHorizontal: 17,
          }}> */}
      {/* <Text
            style={{
              textAlign: 'center',
              marginRight: 10,
              ...FONTS.fontSatoshiBold,
            }}>
            Filter
          </Text> */}
      {/* <AntDesignIcon
            color={'#374957'}
            size={20}
            name="filter" */}
      {/* //   style={{textAlign: 'center', marginVertical: 12}} */}
      {/* // /> */}
      {/* </TouchableOpacity> */}
      {/* </View> */}
      {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 8,
            marginBottom: 15,
          }}> */}
      {/* {productData &&
            productData.map((product, index) => (
              <View
                key={index}
                style={{
                  width: itemView == 'list' ? '100%' : '50%',
                  paddingHorizontal: 10,
                  marginBottom: 8,
                }}>
                <ItemCard
                  listView={itemView == 'list' ? true : false}
                  id={product.id}
                  isLike={true}
                  // handleLike={handleLike}
                  subCategory="MEN - LS - REGULER"
                  imageSrc={product.images[0].src}
                  price={product.variants[0].price}
                  oldPrice={product.variants[0].compare_at_price}
                  title={product.title}
                  shopBtn={false}
                  itemName={product.title}
                />
              </View>
            ))} */}
      {/* <FlatList
        data={productData}
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
        }} */}
      {/* // onEndReached={() => { */}
      {/* // Load more data here */}
      {/* // }} */}
      {/* // /> */}
      {/* </View> */}
      {/* </ScrollView> */}
      {/* <Snackbar
        visible={isSnackbar}
        duration={3000}
        onDismiss={() => setIsSnackbar(false)}
        action={{
          label: 'Undo',
          onPress: () => { */}
      {/* // do something */}
      {/* },
        }}> */}
      {/* {snackText}
      </Snackbar> */}
    </SafeAreaView>
  );
};

export default Wishlist;
