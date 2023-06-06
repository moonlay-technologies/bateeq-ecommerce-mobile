import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import { useEffect } from 'react';
import Modal from '../../components/Modal/OptionBar';
import { GET_CUSTOMER_ADDRESS } from '../../graphql/queries';
import AuthService from '../../service/auth/auth-service';
import { useMutation, useQuery } from '@apollo/client';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import LoadingComponent from '../../components/LoadingView'
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../store/reducer';
import { useNavigation } from '@react-navigation/native';
import { REMOVE_CUSTOMER_ADDRESS } from '../../graphql/mutation';

const Address = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userAddress } = useSelector(state => state.user)
  const [token, setToken]=useState('')
  const [customerAddress, setCustomerAddress] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [addressSelected, setAddressSelected]=useState()
  const [isLoadingDelete,setIsLoadingDelete] = useState(false)
  const [showModal, setShowModal] = useState({
    show: false,
    data: ''
  })
  const {data: address, error: errorAddress, loading: loadingAddress, refetch } = useQuery(GET_CUSTOMER_ADDRESS, {
    variables: {
      fetchPolicy: 'no-cache',
      accessToken: token,
      limit: 20
    }
  })
  const [customerAddressDelete] = useMutation(REMOVE_CUSTOMER_ADDRESS)

  useEffect(()=>{
    setIsLoading(true)
    AuthService?.getToken()
      .then(result => {
        setToken(result|| '')
        setIsLoading(false)
      })
      .catch(err => {
        Toast.show({
          type: 'error', 
          text1: 'Oops!',
          text2: err?.originalError?.message || 'something went wrong'
        })
        setIsLoading(false)
      })   
  }, [])

  useEffect(()=>{
    if(address?.customer){
      setCustomerAddress(address?.customer?.addresses?.edges.map(i=>({
        ...i.node,
        // selected:false
      })) || [])
    }
   
  }, [address])

  const handleSelectAddress = (address) => {
    dispatch(setAddress(''))
    setAddressSelected(address)
  }

  const handleDelete = async () => {
    setIsLoadingDelete(true)
    await customerAddressDelete({
      variables: {
        id: showModal?.data?.id,
        customerAccessToken: token
      }
    })
    refetch()
    setShowModal(prev => ({
      ...prev,
      show: !prev.show
    }))
    setIsLoadingDelete(false)
  }

  const onSubmit = () => {
    setIsLoading(true)
    dispatch(setAddress(addressSelected))
    setIsLoading(false)
    navigation.pop()
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <Text
            style={[
              FONTS.fontSatoshiBold,
              {color: COLORS.title, marginBottom: 10, fontSize: 24},
            ]}>
            Select Address
          </Text>
          {isLoading && <LoadingComponent type='circle'/>}
          <Modal 
            text={`${showModal?.data?.company || 'this address' } will be deleted from your adresses list`} 
            onOpen={showModal.show}
            visible={showModal.show}
            toggle={()=>setShowModal(prev => ({
              ...prev,
              show: !prev.show
            }))}
            submitText={isLoading ? 'Deleting ...' : 'Delete'}
            disabled={isLoading}
            onContinue={handleDelete}
        />
          {customerAddress?.length > 0 && customerAddress?.map((item, index) => {
            const {company, address1, city, id} = item
           
            return (
            <TouchableOpacity
              style={[
                styles.card,
                addressSelected?.address1 === address ? styles.selectedCard : null,
              ]}
              onPress={() => handleSelectAddress(item)}
              key={index}>
              {isLoadingDelete && showModal?.data?.id === id ? <LoadingComponent type='circle' key={id}/> : (
                <View>
                    <Text style={styles.name}>{company}</Text>
                    <Text style={styles.address}>{address1}</Text>
                    <Text style={styles.city}>{city}</Text>
                    {[addressSelected?.address1 === address1, userAddress?.address1 === address1].some(i => i === true) && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>Selected</Text>
                      </View>
                    )}
                </View>
              )}
         

             <FeatherIcon     
               onPress={() => setShowModal(prev =>({
                      data: { id , company },
                      show: !prev.show
                    }))}  
                style={styles.icon} 
                name='trash-2' 
                size={16} 
              />
            </TouchableOpacity>
          )})}
          <View
            style={{
              marginTop: 12,
              flexDirection: 'column',
              marginHorizontal: -12,
              marginBottom: -12,
              paddingHorizontal: 85,
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
                }}>
                <Text style={{...FONTS.fontSatoshiBold, color: COLORS.title}}>
                  Add Address
                </Text>
                <OcticonsIcon color={COLORS.title} size={18} name="plus" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
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
                  {isLoading ? 'Saving ...' : 'Select Address'}
                </Text>
                <OcticonsIcon color={COLORS.white} size={18} name="check" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
    marginTop:20 ,
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
    color: 'red'
  }
});