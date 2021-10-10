import React, { useState } from 'react';
import {
    Dimensions,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    Modal
} from 'react-native';
import COLORS from '../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorModal from './ErrorModal';
const { height } = Dimensions.get('window');


export default function Card({ resources, navigation }) {
    const [isModalVisible, setModalVisible] = useState(true);

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <View>
            {/* {isModalVisible ? <ErrorModal /> : null} */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetailsScreen', resources)}>
                <View style={style.cardContainer}>
                    {/* Render the card image */}
                    <View style={style.cardImageContainer}>
                        <Image
                            source={{ uri: resources.image }}
                            style={{
                                width: '80%',
                                height: '80%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                    {/* Render all the card details here */}
                    <View style={style.cardDetailsContainer}>
                        {/* Name and gender icon */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text
                                style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>
                                {resources?.title}
                            </Text>
                            {resources?.favourit ? <Icon name="heart" size={22} color={COLORS.yellow} /> :
                                <TouchableOpacity onPress={() => openModal()}>
                                    <Icon name="heart-outline" size={22} color={COLORS.grey} />
                                </TouchableOpacity>}
                        </View>

                        {/* Render the age and type */}
                        <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
                            {resources?.author}
                        </Text>
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            <Icon name="currency-usd" color={COLORS.primary} size={18} />
                            <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
                                {resources?.price.displayValue}
                            </Text>
                        </View>

                        {/* Render distance and the icon */}
                        <View style={{ marginTop: 5, flexDirection: 'row' }}>
                            <Icon name="star-face" color={COLORS.yellow} size={18} />
                            <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
                                {resources?.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        minHeight: height,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});