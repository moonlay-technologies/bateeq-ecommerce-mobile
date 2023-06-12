import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  // View,
  // TouchableOpacity,
  // Text,
  // Image,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import {IconButton} from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
// import Header from '../../layout/Header';
import AllCart from './AllCart';
import Canceled from './Canceled';
import Completed from './Completed';
// import OnDelivery from './OnDelivery';
import Confirm from './Confirm';
// import {useQuery} from '@apollo/client';
// import {GET_ORDERS} from '../../service/admin-graphql/query/orders';
import HeaderComponent from '../../components/HeaderComponent';

const renderScene = SceneMap({
  All: AllCart,
  // OnDelivery: OnDelivery,
  Confirm: Confirm,
  Completed: Completed,
  Canceled: Canceled,
});

const Orders = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [dataOrders, setDataOrders] = useState([]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'All', title: 'All' },
    // {key: 'OnDelivery', title: 'On Delivery'},
    { key: 'Confirm', title: 'Confirm' },
    { key: 'Completed', title: 'Completed' },
    { key: 'Canceled', title: 'Canceled' },
  ]);

  // const {data, loading} = useQuery(GET_ORDERS, {
  //   variables: {
  //     customerId: 'gid://shopify/Customer/7132117664027',
  //     query: 'financial_status:paid',
  //   },
  //   context: {
  //     clientName: 'httpLink2',
  //   },
  // });

  // console.log('data httplink2', data?.customer?.orders);

  // useEffect(() => {
  //   if(data) {
  //     setDataOrders(data.customer.orders)
  //   }
  // },[data])

  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <HeaderComponent />
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor={COLORS.title}
            indicatorStyle={{ backgroundColor: 'transparent' }}
            labelStyle={{
              //   ...FONTS.fontLg,
              ...FONTS.fontSatoshiBold,
              color: '#B2B2B2',
              textTransform: 'capitalize',
            }}
            scrollEnabled={true}
            tabStyle={{
              width: 115,
              borderWidth: 1,
              borderColor: '#B2B2B2',
              marginRight: 6,
              borderRadius: 6,
            }}
            style={{
              backgroundColor: 'transparent',
              elevation: 0,
              borderWidth: 1,
              borderColor: COLORS.white,
              marginLeft: 16,
            }}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default Orders;
