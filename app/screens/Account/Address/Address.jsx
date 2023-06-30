import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';
import Modal from '../../../components/ActionModalComponent';
import LoadingComponent from '../../../components/LoadingView';
import HeaderComponent from '../../../components/HeaderComponent';
import Button from '../../../components/ButtonComponent';
import { getAddressList, removeCustomerAddress, updateDefaultCustomerAddress } from '../../../store/actions/address';
import NoContent from '../../../components/NoContent';

function AddressScreen(props) {
  const {
    token,
    route,
    getAddressList: getAddress,
    addressList,
    defaultAddress,
    removeCustomerAddress: removeAddress,
    updateDefaultCustomerAddress: updateDefaultAddress,
    actionLoading,
  } = props;
  const navigation = useNavigation();
  const [addressSelected, setAddressSelected] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [defaultCustomerAddress, setDefaultCustomerAddress] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [showModal, setShowModal] = useState({
    show: false,
    data: '',
  });

  useEffect(() => {
    getAddress({ token, limit: 10 });
  }, []);

  useEffect(() => {
    setDefaultCustomerAddress(defaultAddress);
    setCustomerAddress(addressList);
  }, [defaultAddress, addressList]);

  const handleSelectAddress = value => {
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
    setTimeout(() => {
      getAddress({ token, limit: 10 });
      setIsLoadingDelete(false);
    }, 500);
  };

  const onSubmit = () => {
    if (addressSelected) {
      updateDefaultAddress({
        addressId: addressSelected?.id,
        customerAccessToken: token,
      });
      getAddress({ token, limit: 10 });
      setAddressSelected('');
      navigation.navigate('Address');
    }
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
            submitText={customerAddress?.loading ? 'Deleting ...' : 'Delete'}
            disabled={customerAddress?.loading}
            onContinue={handleDelete}
          />
          {customerAddress?.data?.length > 0 ? (
            customerAddress?.data?.map(item => {
              const { address1, city, province, country, id, company } = item;

              return (
                <TouchableOpacity
                  style={[
                    styles.card,
                    !addressSelected && defaultCustomerAddress?.data?.id === id
                      ? styles.selectedCard
                      : addressSelected?.id === id
                      ? styles.selectedCard
                      : null,
                  ]}
                  onPress={() => handleSelectAddress(item)}
                  key={`${id}`}
                >
                  {(isLoadingDelete && showModal?.data?.id === id) ||
                  customerAddress?.loading ||
                  actionLoading ||
                  route?.params?.editedId === id ? (
                    <LoadingComponent type="circle" key={id} />
                  ) : (
                    <View>
                      <Text style={styles.name}>{company}</Text>
                      <Text style={styles.address}>{address1}</Text>
                      <Text style={styles.city}>{city}</Text>
                      <Text style={styles.city}>{province}</Text>
                      <Text style={styles.city}>{country}</Text>
                      {/* defaultCustomerAddress?.data?.address1 === address1 */}
                      {/* {[addressSelected?.address1 === address1].some(i => i === true) && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Selected</Text>
                        </View>
                      )} */}

                      {/* !userAddress?.address1 &&  */}
                      {!addressSelected && defaultCustomerAddress?.data?.id === id && (
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
            })
          ) : customerAddress?.data.length === 0 && customerAddress?.loading ? (
            <LoadingComponent type="circle" />
          ) : (
            <NoContent text="No addresses found. Please add an address." icon={FontAwesome} name="address-book" />
          )}
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
              title={customerAddress?.loading ? 'Loading ...' : 'Select Address'}
              size="xxl"
              icon={OcticonsIcon}
              iconName="check"
              disabled={customerAddress?.data.length === 0}
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
    color: COLORS.title,
  },
  address: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.label,
  },
  city: {
    fontSize: 16,
    color: COLORS.label,
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
    const { addressList, defaultAddress, actionLoading } = Address;

    return { token, address, addressList, defaultAddress, actionLoading };
  },
  { getAddressList, removeCustomerAddress, updateDefaultCustomerAddress }
)(React.memo(AddressScreen));
