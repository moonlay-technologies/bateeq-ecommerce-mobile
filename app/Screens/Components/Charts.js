import React from 'react';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import BasicLineChart from '../../components/Charts/LineChart';
import BasicBarChart from '../../components/Charts/BarChart';
import BasicPieChart from '../../components/Charts/PieChart';
import DropShadow from 'react-native-drop-shadow';

const Charts = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:COLORS.backgroundColor}}>
                <Header 
                    titleLeft
                    title={'Charts'} 
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <DropShadow
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            }}
                        >
                            <View style={GlobalStyleSheet.card}>
                                <View style={{marginBottom:15}}>
                                    <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:COLORS.title}}>Line Chart</Text>
                                </View>
                                <BasicLineChart/>
                            </View>
                        </DropShadow>

                        <DropShadow
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            }}
                        >
                            <View style={GlobalStyleSheet.card}>
                                <View style={{marginBottom:15}}>
                                    <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:COLORS.title}}>Bar Chart</Text>
                                </View>

                                <BasicBarChart/>

                            </View>
                        </DropShadow>

                        <DropShadow
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: .15,
                                shadowRadius: 5,
                            }}
                        >
                            <View style={GlobalStyleSheet.card}>
                                <View style={{marginBottom:15}}>
                                    <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:COLORS.title}}>Pie Chart</Text>
                                </View>
                                
                                <BasicPieChart/>

                            </View>

                        </DropShadow>
                       
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Charts;