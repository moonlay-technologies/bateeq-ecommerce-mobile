import React from 'react';
import {
    SafeAreaView,
    useWindowDimensions,
    View,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IconButton} from 'react-native-paper';
import {COLORS, FONTS} from '../../constants/theme';
import AllCart from './AllCart';
import Canceled from './Canceled';
import Completed from './Completed';
import OnDelivery from './OnDelivery';
import {Dimensions} from 'react-native';

const screen = Dimensions.get('window');
const renderScene = SceneMap({
    All: AllCart,
    OnDelivery: OnDelivery,
    Completed: Completed,
    Canceled: Canceled,
});

const Orders = ({navigation}) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes, setRoute] = React.useState([
        {key: 'All', title: 'ALL', active: true},
        {key: 'OnDelivery', title: 'ON DELIVERY', active: false},
        {key: 'Completed', title: 'COMPLETED', active: false},
        {key: 'Canceled', title: 'CANCELED', active: false},
    ]);

    const handlePress = () => {
        navigation.navigate('Home');
    };

    function onChangeTab(idx) {
        if (idx > 0) {
            setIndex(idx)
            for (let i = 0; i < routes.length; i++) {
                routes[i].active = false
            }
            routes[idx].active = true
            setRoute(routes)
        } else {
            setIndex(0)
            for (let i = 0; i < routes.length; i++) {
                routes[i].active = false
            }
            routes[0].active = true
            setRoute(routes)
        }
    }

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
                    width: screen.width + 40,
                    marginRight: -20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginLeft: -20
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
                            <FeatherIcon color={COLORS.title} size={18} name="menu"/>
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
                            <FeatherIcon color={COLORS.title} size={20} name="shopping-bag"/>
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
            <View
                style={{
                    flex: 1,
                    // width:screen.width + 20,
                    // marginLeft:-20,
                }}
            >
                <TabView
                    pagerStyle={{
                        borderWidth: 1,
                        borderColor: '#fff000'
                    }}
                    renderTabBar={(props) => {
                        return (
                            <TabBar
                                {...props}
                                activeOpacity={0}
                                activeColor={'#32bccc'}
                                renderLabel={(value) => {
                                    let title = `${value?.route?.title}`.toUpperCase()
                                    return (
                                        <View style={{
                                            borderWidth: 1,
                                            width: props.layout.width / 3,
                                            flex: 1,
                                            paddingVertical: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderColor: value?.route?.active ? '#32bccc' : '#B2B2B2',
                                            borderRadius: 10,

                                        }}>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontFamily: `Satoshi-${value?.route?.active ? "Bold" : "Medium"}`,
                                                    color: value?.route?.active ? '#32bccc' : '#B2B2B2',
                                                }}
                                            >{title}</Text>
                                        </View>
                                    )
                                }}
                                pressColor={'transparent'}
                                indicatorStyle={{backgroundColor: 'transparent'}}
                                scrollEnabled={true}
                                tabStyle={{
                                    paddingBottom: 20,
                                }}
                                style={{
                                    backgroundColor: 'transparent',
                                    elevation: 0,
                                }}
                            >
                                {
                                    ({getLabelText}) => {
                                        return (
                                            <View>
                                                <Text>{getLabelText}</Text>
                                            </View>
                                        )
                                    }
                                }
                            </TabBar>
                        )
                    }}
                    style={{}}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={onChangeTab}
                    initialLayout={{width: layout.width}}
                />
            </View>
        </SafeAreaView>
    );
};

export default Orders;
