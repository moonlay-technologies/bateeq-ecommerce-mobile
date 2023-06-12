import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import OptionBar from '../../components/Modal/OptionBar';
import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DELETE_ADDRESS} from '../../service/graphql/mutation/profile';
import {GET_DETAIL_ACCOUNT} from '../../service/graphql/query/profile/profile';
import {useDispatch} from 'react-redux';
import {setCustomerData} from '../../stores/reducers/customerReducer';
import {gqlError} from '../../utils/error-handling';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import LoadingScreen from '../../components/LoadingView';

const Address = ({navigation, route}) => {
  const {loading} = route.params;
  const [selectedCardId, setSelectedCardId] = useState(null);
  const dataAccount = useSelector(state => state.customer.customerData);
  const [listData, setListData] = useState(dataAccount?.addresses?.nodes);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchValue = async () => {
      const retrievedValue = await AsyncStorage.getItem('accessToken');
      setToken(retrievedValue);
    };

    fetchValue();
  }, []);

  const onError = err => {
    gqlError({error: err, Toast});
  };

  const [CustomerDeleteAddress] = useMutation(DELETE_ADDRESS, {
    fetchPolicy: 'no-cache',
    variables: {
      id: '',
      customerAccessToken: token,
    },
  });

  const handleCardClick = id => {
    setSelectedCardId(id);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const deleteRow = () => {
    setShowConfirmation(true);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex(item => item.id === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
  };

  const handleCancel = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    setShowConfirmation(false);
  };

  const {loading: loadingRefetch, refetch: refetchAccountData} = useQuery(
    GET_DETAIL_ACCOUNT,
    {
      fetchPolicy: 'no-cache',
      variables: {
        customerAccessToken: token,
      },
      onCompleted: ({customer}) => {
        if (customer) {
          dispatch(setCustomerData(customer));
          setListData(customer?.addresses?.nodes);
        }
      },
      onError: err => {
        onError(err);
      },
    },
  );

  useEffect(() => {
    refetchAccountData();
  }, []);

  const handleContinueDelete = async (rowMap, rowKey) => {
    try {
      const {data} = await CustomerDeleteAddress({
        fetchPolicy: 'no-cache',
        variables: {
          id: rowKey,
          customerAccessToken: token,
        },
      });
      if (data.customerAddressDelete.deletedCustomerAddressId) {
        await refetchAccountData();
        Toast.show({
          type: 'success',
          text1: 'delete data success',
          visibilityTime: 3000,
        });
        setShowConfirmation(false);
        closeRow(rowMap, rowKey);
      } else {
        onError(data.customerAddressDelete.customerUserErrors[0].message);
      }
    } catch (error) {
      onError(error);
    }
  };

  const renderItem = data => (
    <TouchableHighlight
      underlayColor="#DDDDDD"
      style={{
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 6,
        justifyContent: 'center',
        height: 120,
        marginBottom: 10,
      }}
      onPress={() => handleCardClick(data.item.id)}
      key={data.item.id}>
      <View
        style={{
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            marginBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 320,
          }}>
          <Text
            style={{
              ...FONTS.fontSatoshiBold,
              fontSize: 14,
              color: COLORS.title,
            }}>
            {data?.item?.company}
          </Text>
          {selectedCardId === data.item.id && (
            <View
              style={{
                backgroundColor: '#F2F2F2',
                paddingHorizontal: 10,
                paddingTop: 6,
                paddingBottom: 4,
                borderRadius: 15,
              }}>
              <Text style={{...FONTS.fontXs, ...FONTS.fontSatoshiBold}}>
                selected
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text
            style={{
              ...FONTS.font,
              fontSize: 14,
            }}>
            {data.item.address1}, {data.item.city},
          </Text>
          <Text>
            {data.item.province} {data.item.country}, {data.item.zip}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow()}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
      {showConfirmation && (
        <Modal visible={showConfirmation} transparent={true} style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <OptionBar
              text={'Delete this address ?'}
              onCancel={() => handleCancel(rowMap, data.item.id)}
              onContinue={() => handleContinueDelete(rowMap, data.item.id)}
            />
          </View>
        </Modal>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <View style={GlobalStyleSheet.container}>
        <Text
          style={[
            FONTS.fontSatoshiBold,
            {color: COLORS.title, marginBottom: 10, fontSize: 24},
          ]}>
          Select Address
        </Text>
        {loadingRefetch ||
          (loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}>
              <LoadingScreen Loading2 />
            </View>
          ))}
        {listData?.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 60,
            }}>
            <Text style={{color: COLORS.title}}>Oops, No address yet</Text>
          </View>
        ) : (
          <SwipeListView
            data={listData}
            style={{height: 470}}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            closeOnRowOpen={true}
            closeOnRowPress={true}
            rightOpenValue={-70}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        )}
        <View
          style={{
            marginTop: 2,
            flexDirection: 'column',
            paddingHorizontal: 85,
            height: 120,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddDeliveryAddress')}
            style={{
              flex: 1,
              padding: 12,
              marginVertical: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.title,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                height: 300,
              }}>
              <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
                Add Address
              </Text>
              <OcticonsIcon color={COLORS.title} size={18} name="plus" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 12,
              alignItems: 'center',
              borderWidth: 1,
              backgroundColor: '#333333',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <Text style={{...FONTS.fontSatoshiBold, color: COLORS.white}}>
                Select Address
              </Text>
              <OcticonsIcon color={COLORS.white} size={18} name="check" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: 115,
    marginTop: 2,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
export default Address;
