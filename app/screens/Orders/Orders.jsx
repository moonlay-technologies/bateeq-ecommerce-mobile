import React from 'react';
import { SafeAreaView, useWindowDimensions, View, TouchableOpacity, Text, Image } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { IconButton } from 'react-native-paper';
import { COLORS, FONTS } from '../../constants/theme';
import AllCart from './AllCart';
import Canceled from './Canceled';
import Completed from './Completed';
import OnDelivery from './OnDelivery';
import { Dimensions } from 'react-native';
import Confirm from './Confirm';
import HeaderComponent from '../../components/HeaderComponent';

const screen = Dimensions.get('window');
const renderScene = SceneMap({
  All: AllCart,
  Confirm: Confirm,
  Completed: Completed,
  Canceled: Canceled,
});

const Orders = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoute] = React.useState([
    { key: 'All', title: 'ALL', active: true },
    { key: 'Confirm', title: 'CONFIRM', active: false },
    { key: 'Completed', title: 'COMPLETED', active: false },
    { key: 'Canceled', title: 'CANCELED', active: false },
  ]);

  const handlePress = () => {
    navigation.navigate('Home');
  };

  function onChangeTab(idx) {
    if (idx > 0) {
      setIndex(idx);
      for (let i = 0; i < routes.length; i++) {
        routes[i].active = false;
      }
      routes[idx].active = true;
      setRoute(routes);
    } else {
      setIndex(0);
      for (let i = 0; i < routes.length; i++) {
        routes[i].active = false;
      }
      routes[0].active = true;
      setRoute(routes);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <HeaderComponent />
      <View
        style={{
          flex: 1,
        }}
      >
        <TabView
          pagerStyle={{
            borderWidth: 1,
            borderColor: '#fff000',
          }}
          renderTabBar={props => {
            return (
              <TabBar
                {...props}
                activeOpacity={0}
                activeColor={'#32bccc'}
                renderLabel={value => {
                  let title = `${value?.route?.title}`.toUpperCase();
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        width: props.layout.width / 3,
                        flex: 1,
                        paddingVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: value?.route?.active ? '#32bccc' : '#B2B2B2',
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: `Satoshi-${value?.route?.active ? 'Bold' : 'Medium'}`,
                          color: value?.route?.active ? '#32bccc' : '#B2B2B2',
                        }}
                      >
                        {title}
                      </Text>
                    </View>
                  );
                }}
                pressColor={'transparent'}
                indicatorStyle={{ backgroundColor: 'transparent' }}
                scrollEnabled={true}
                tabStyle={{
                  paddingBottom: 20,
                }}
                style={{
                  backgroundColor: 'transparent',
                  elevation: 0,
                }}
              >
                {({ getLabelText }) => {
                  return (
                    <View>
                      <Text>{getLabelText}</Text>
                    </View>
                  );
                }}
              </TabBar>
            );
          }}
          style={{}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={onChangeTab}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
