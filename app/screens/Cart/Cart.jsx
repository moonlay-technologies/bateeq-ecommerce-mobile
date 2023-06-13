import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {COLORS, FONTS} from '../../constants/theme';
import CartList from '../../components/CartList';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingView';
import Modal from '../../components/ActionModalComponent';

import ButtonSm from '../../component-template/Button/ButtonSm';
import Header from '../../layout/Header';
import NoContent from '../../components/NoContent';
import {CartDeleteListOfItem, CartGetList} from "../../store/actions";
import FeatherIcon from "react-native-vector-icons/Feather";

const Cart = ({navigation, route, ...props}) => {
    let {cartId, CartGetList, lists, CartDeleteListOfItem} = props

    const [params, setParams] = useState({
        first: 0,
        id: cartId
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const [showModal, setShowModal] = useState({
        show: false,
        data: null
    })
    const handleDelete = async () => {
        setIsLoading(true)
        CartDeleteListOfItem({
            cartId,
            lineIds: showModal?.data?.lineIds ?? []
        })

        setShowModal(prev => ({
            ...prev,
            data: null,
            show: !prev.show
        }))
        setIsChange(!isChange)
        setIsLoading(false)
    }

    useEffect(() => {
        CartGetList({
            ...params,
            id: cartId
        })
    }, [route, CartGetList, params, cartId])


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.backgroundColor,
            }}>
            <Modal
                text={`${showModal?.data?.title || ''} will be deleted from your cart`}
                onOpen={showModal.show}
                visible={showModal.show}
                toggle={() => setShowModal(prev => ({
                    ...prev,
                    show: !prev.show
                }))}
                submitText={isLoading ? 'Deleting ...' : 'Delete'}
                disabled={isLoading}
                onContinue={handleDelete}
            />
            <View style={{paddingHorizontal: 20}}>
                <Header
                    backAction={() => navigation.goBack()}
                    titleLeft
                    title={'back'}
                    leftIcon={'back'}
                />
            </View>
            <Text
                style={{
                    color: COLORS.title,
                    fontSize: 24,
                    ...FONTS.fontSatoshiBold,
                    paddingHorizontal: 20,
                    paddingTop: 20,
                }}>
                My Cart
            </Text>

            <View style={{flex: 1, padding: 10}}>
                <ScrollView>
                    {lists?.loading ?
                        <LoadingScreen Loading2/> : lists?.data?.length > 0 ? lists?.data.map((data) => {
                                const {
                                    quantity,
                                    attributes,
                                    id: lineId,
                                    merchandise: {id: merchandiseId, image, product: {id, title}},
                                    cost: {
                                        totalAmount: {amount, currencyCode},
                                        compareAtAmountPerQuantity: {amount: original_price}
                                    },
                                } = data

                                return (
                                    <View key={`${lineId}-${id}`}>
                                        <CartList
                                            withIncrementDecrement
                                            image={{uri: image?.url}}
                                            title={title}
                                            size={attributes.find(i => i.key === 'Size')?.value}
                                            attributes={attributes.map(({__typename, ...rest}) => rest)}
                                            cartId={cartId}
                                            quantity={quantity}
                                            price={amount}
                                            originalPrice={original_price}
                                            currencyCode={currencyCode}
                                            lineId={lineId}
                                            setIsChange={setIsChange}
                                            isChange={isChange}
                                            merchandiseId={merchandiseId}
                                            addComponent={

                                            <ButtonSm
                                                disabled={data?.loading ?? false}
                                                title={
                                                data?.loading ?
                                                    <FeatherIcon
                                                        name="loader"
                                                        size={16}
                                                    />
                                                    :
                                                    <FeatherIcon
                                                        name="trash-2"
                                                        size={16}
                                                    />
                                                }
                                                color={!data?.loading ? '#e63f31' : '#656565'}
                                                style={{
                                                    // width: 60,
                                                    marginLeft:10,
                                                    backgroundColor: !data?.loading ? '#fbfbfb' : "rgba(101,101,101,0.18)",
                                                    borderColor: !data?.loading? '#c42b1c' : '#656565',
                                                    borderWidth: 1,
                                                }}
                                                textStyle={{
                                                    color: !data?.loading? '#c42b1c' : 'rgba(101,101,101,0.73)',
                                                    fontWeight: '900'
                                                }}
                                                onPress={() => setShowModal(prev => ({
                                                    data: {lineIds: [lineId], title},
                                                    show: !prev.show
                                                }))}
                                            />
                                        }/>
                                    </View>
                                )
                            })
                            : (
                                <View>
                                    <NoContent to={() => navigation.navigate('Home')}/>
                                </View>
                            )
                    }
                    <View style={{padding: 20}}>
                        <Text style={{...FONTS.fontSatoshiBold, marginBottom: 12}}>
                            Special Instruction
                        </Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Write Instruction Here..."
                            placeholderTextColor="gray"
                            numberOfLines={5}
                            multiline={true}
                            style={{
                                borderWidth: 1,
                                textAlignVertical: 'top',
                                padding: 15,
                                ...FONTS.fontSatoshiRegular,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 100,
                        }}>
                        <CustomButton
                            onPress={() => navigation.navigate('Checkout')}
                            title="Checkout"
                            customWidth={200}
                            arrowIcon={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default connect(({Cart}) => {
    let {options, lists} = Cart
    return {
        cartId: options?.cartId,
        lists
    }
}, {CartDeleteListOfItem, CartGetList})(React.memo(Cart));
