import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';

import Modal from '../../../components/ActionModalComponent';
import LoadingComponent from '../../../components/LoadingView';
import { setAddress } from '../../../store/reducer';
import HeaderComponent from '../../../components/HeaderComponent';
import Button from '../../../components/ButtonComponent';
import { getAddressList, removeCustomerAddress, updateDefaultCustomerAddress } from '../../../store/actions/address';

function AddressScreen(props) {
  const {
    token,
    getAddressList: getAddress,
    addressList,
    defaultAddress,
    removeCustomerAddress: removeAddress,
    updateDefaultCustomerAddress: updateDefaultAddress,
  } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [addressSelected, setAddressSelected] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    data: '',
  });

  useEffect(() => {
    if (!addressList?.isChange) {
      getAddress({ token, limit: 10 });
    }
  }, []);

  useEffect(() => {
    setIsLoading(!addressList?.data.length > 0);

    if (addressList?.isChange) {
      getAddress({ token, limit: 10 });
      setIsLoadingDelete(addressList?.loading);
    }
  }, [addressList]);

  const handleSelectAddress = value => {
    dispatch(setAddress(''));
    setAddressSelected(value);
  };

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    removeAddress({
      id: showModal?.data?.id,
      customerAccessToken: token,
    });
    setShowModal(prev => ({
      ...prev,
      show: !prev.show,
    }));
    setIsLoadingDelete(false);
  };

  const onSubmit = async () => {
    // setIsLoading(true);
    updateDefaultAddress({
      addressId: addressSelected?.id,
      customerAccessToken: token,
    });
    // const { data, errors } = await customerDefaultAddressUpdate({
    //   variables: {

    //   },
    // });
    // if (data) {
    //   dispatch(setAddress(addressSelected));
    //   setIsLoading(false);
    //   navigation.pop();
    // }
    // if (errors) {
    //   setIsLoading(false);
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Oops',
    //     text2: 'errors',
    //   });
    // }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderComponent withoutCartAndLogo backAction icon="back" title="Back" />
      </View>
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <Text style={[FONTS.fontSatoshiBold, { color: COLORS.title, marginBottom: 10, fontSize: 24 }]}>
            Select Address
          </Text>
          {isLoading && <LoadingComponent type="circle" />}
          <Modal
            text={`${showModal?.data?.company || 'this address'} will be deleted from your adresses list`}
            onOpen={showModal.show}
            visible={showModal.show}
            toggle={() =>
              setShowModal(prev => ({
                ...prev,
                show: !prev.show,
              }))
            }
            submitText={isLoading ? 'Deleting ...' : 'Delete'}
            disabled={isLoading}
            onContinue={handleDelete}
          />
          {addressList?.data.length > 0 &&
            addressList?.data.map(item => {
              const { address1, city, province, country, id, company } = item;

              return (
                <TouchableOpacity
                  style={[
                    styles.card,
                    !addressSelected && defaultAddress?.data?.address1 === address1
                      ? styles.selectedCard
                      : addressSelected?.address1 === address1
                      ? styles.selectedCard
                      : null,
                  ]}
                  onPress={() => handleSelectAddress(item)}
                  key={`${address1}`}
                >
                  {isLoadingDelete && showModal?.data?.id === id ? (
                    <LoadingComponent type="circle" key={id} />
                  ) : (
                    <View>
                      <Text style={styles.name}>{company}</Text>
                      <Text style={styles.address}>{address1}</Text>
                      <Text style={styles.city}>{city}</Text>
                      <Text style={styles.city}>{province}</Text>
                      <Text style={styles.city}>{country}</Text>
                      {/* defaultAddress?.data?.address1 === address1 */}
                      {[addressSelected?.address1 === address1].some(i => i === true) && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Selected</Text>
                        </View>
                      )}

                      {/* !userAddress?.address1 &&  */}
                      {!addressSelected && defaultAddress?.data?.address1 === address1 && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Selected</Text>
                        </View>
                      )}
                    </View>
                  )}
                  <View style={styles.iconContainer}>
                    <Button
                      size="sm"
                      onPress={() => navigation.navigate('EditAddress', { id })}
                      title={
                        <FeatherIcon
                          style={{ ...styles.icon, marginRight: 30, color: '#656513' }}
                          name="edit"
                          size={16}
                        />
                      }
                      style={{ borderColor: '#656513' }}
                      outline
                    />

                    <Button
                      size="sm"
                      onPress={() =>
                        setShowModal(prev => ({
                          data: { id, company },
                          show: !prev.show,
                        }))
                      }
                      title={<FeatherIcon name="trash-2" size={16} style={styles.icon} />}
                      style={{ borderColor: COLORS.danger, marginLeft: 20 }}
                      outline
                      iconStyles={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          <View
            style={{
              marginTop: 12,
              flexDirection: 'column',
              marginHorizontal: -12,
              marginBottom: -12,
              paddingHorizontal: 85,
            }}
          >
            <Button
              onPress={() => navigation.navigate('AddAddress')}
              title="Add Address"
              size="xxl"
              style={{ backgroundColor: COLORS.white, borderColor: COLORS.title, borderWidth: 1, marginBottom: 20 }}
              textStyle={{ color: COLORS.title }}
              iconColor={COLORS.title}
              icon={OcticonsIcon}
              iconName="plus"
            />
            <Button
              onPress={onSubmit}
              title={isLoading ? 'Saving ...' : 'Select Address'}
              size="xxl"
              icon={OcticonsIcon}
              iconName="check"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCard: {
    borderColor: '#f00',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
  },
  city: {
    fontSize: 16,
    color: '#888',
  },
  tag: {
    backgroundColor: '#585858',
    marginTop: 20,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
  },
  icon: {
    right: 16,
    bottom: 20,
    position: 'absolute',
    color: COLORS.danger,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default connect(
  ({ User, Address }) => {
    const {
      options: { token },
      collections: { address },
    } = User;
    const { addressList, defaultAddress } = Address;
    return { token, address, addressList, defaultAddress };
  },
  { getAddressList, removeCustomerAddress, updateDefaultCustomerAddress }
)(React.memo(AddressScreen));
