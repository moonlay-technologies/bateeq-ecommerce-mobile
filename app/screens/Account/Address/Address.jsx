import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useMutation, useQuery } from '@apollo/client';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { COLORS, FONTS } from '../../../constants/theme';

import Modal from '../../../components/ActionModalComponent';
import { GET_CUSTOMER_ADDRESS } from '../../../graphql/queries';
import LoadingComponent from '../../../components/LoadingView';
import { setAddress } from '../../../store/reducer';
import { CUSTOMER_DEFAULT_ADDRESS_UPDATE, REMOVE_CUSTOMER_ADDRESS } from '../../../graphql/mutation';
import HeaderComponent from '../../../components/HeaderComponent';
import Button from '../../../components/ButtonComponent';

function Address() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userAddress, getToken, defaultAddress } = useSelector(state => state.user);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addressSelected, setAddressSelected] = useState();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    data: '',
  });
  const {
    data: address,
    error: errorAddress,
    loading: loadingAddress,
    refetch,
  } = useQuery(GET_CUSTOMER_ADDRESS, {
    variables: {
      fetchPolicy: 'no-cache',
      accessToken: getToken,
      limit: 20,
    },
  });

  const [customerAddressDelete] = useMutation(REMOVE_CUSTOMER_ADDRESS);
  const [customerDefaultAddressUpdate] = useMutation(CUSTOMER_DEFAULT_ADDRESS_UPDATE);

  useEffect(() => {
    if (address?.customer) {
      setCustomerAddress(
        address?.customer?.addresses?.edges.map(i => ({
          ...i.node,
          // selected:false
        })) || []
      );
    }
  }, [address]);

  const handleSelectAddress = value => {
    dispatch(setAddress(''));
    setAddressSelected(value);
  };

  const handleDelete = async () => {
    setIsLoadingDelete(true);
    await customerAddressDelete({
      variables: {
        id: showModal?.data?.id,
        customerAccessToken: getToken,
      },
    });
    refetch();
    setShowModal(prev => ({
      ...prev,
      show: !prev.show,
    }));
    setIsLoadingDelete(false);
  };
  console.log('addressSekected', addressSelected);
  const onSubmit = async () => {
    setIsLoading(true);

    const { data, errors } = await customerDefaultAddressUpdate({
      variables: {
        addressId: addressSelected?.id,
        customerAccessToken: getToken,
      },
    });
    console.log('onSubmit data', data);
    if (data) {
      dispatch(setAddress(addressSelected));
      setIsLoading(false);
      navigation.pop();
    }
    if (errors) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: 'errors',
      });
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
        {/* <Header titleLeft leftIcon="back" title="Back" /> */}
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
              }))}
            submitText={isLoading ? 'Deleting ...' : 'Delete'}
            disabled={isLoading}
            onContinue={handleDelete}
          />
          {customerAddress?.length > 0 &&
            customerAddress?.map((item, index) => {
              const { company, address1, city, id } = item;

              return (
                <TouchableOpacity
                  style={[
                    styles.card,
                    !addressSelected && defaultAddress?.address1 === address1
                      ? styles.selectedCard
                      : addressSelected?.address1 === address1
                      ? styles.selectedCard
                      : null,
                  ]}
                  onPress={() => handleSelectAddress(item)}
                  key={index}
                >
                  {isLoadingDelete && showModal?.data?.id === id ? (
                    <LoadingComponent type="circle" key={id} />
                  ) : (
                    <View>
                      <Text style={styles.name}>{company}</Text>
                      <Text style={styles.address}>{address1}</Text>
                      <Text style={styles.city}>{city}</Text>
                      {[addressSelected?.address1 === address1, userAddress?.address1 === address1].some(
                        i => i === true
                      ) && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Selected</Text>
                        </View>
                      )}
                      {!userAddress?.address1 && !addressSelected && defaultAddress?.address1 === address1 && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Selected</Text>
                        </View>
                      )}
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <FeatherIcon
                      onPress={() => navigation.navigate('EditAddress', { id })}
                      style={{ ...styles.icon, marginRight: 30, color: '#656513' }}
                      name="edit"
                      size={16}
                    />

                    <FeatherIcon
                      onPress={() =>
                        setShowModal(prev => ({
                          data: { id, company },
                          show: !prev.show,
                        }))}
                      style={styles.icon}
                      name="trash-2"
                      size={16}
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

export default Address;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    color: '#fff',
    fontSize: 12,
  },
  icon: {
    right: 16,
    bottom: 20,
    position: 'absolute',
    color: 'red',
  },
});
