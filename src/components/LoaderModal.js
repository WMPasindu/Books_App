import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native'
import { COLORS, FONT_FAMILY } from "../constants/Component.styles";

const LoaderPopupDialog = props => {
    return (
        <View>
            <Modal
                visible={props.visible}
                transparent={true} >
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>{props.title}</Text>
                            <Text style={styles.textMessage}>{props.message}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        height: '15%',
        width: '50%',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 5,
    },
    wrapper: {
        backgroundColor: "#000000aa",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 30,
        color: COLORS.BLUE_3C,
        fontFamily: FONT_FAMILY.REGULAR,
    },
    textMessage: {
        flex: 1,
        fontSize: 21,
        color: COLORS.BLUE_3C,
        fontFamily: FONT_FAMILY.LIGHT,
        margin: '2%',
        textAlign: 'center'
    }
});

export default LoaderPopupDialog;