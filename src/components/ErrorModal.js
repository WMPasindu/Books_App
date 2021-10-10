import React, { useState } from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, Alert } from 'react-native';
import COLORS from '../const/colors';

export default function ErrorModal({ children }) {
    const [modalVisible, setmodalVisible] = useState(true);

    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.Alert_Main_View}>
                        <Text accessibilityLabel='modalTitle' style={styles.Alert_Title}>Greeting</Text>
                        <View style={{ width: '100%', height: 2, backgroundColor: '#fff' }} />
                        <Text accessibilityLabel='modalTextWithName' style={styles.Alert_Message}> Hello!  </Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#fff' }} />
                        <View style={{ flexDirection: 'row', height: '30%' }}>
                            <TouchableOpacity
                                accessibilityLabel='modalTouchableOpacity'
                                style={styles.buttonStyle}
                                activeOpacity={0.9} >
                                <Text accessibilityLabel='modalButtonOK' style={styles.TextStyle} onPress={() => setmodalVisible(false)}> OK </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: '10%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    sectionTitle: {
        width: '60%',
        fontSize: 20,
        borderWidth: 2,
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: '#B7C9D1',
        justifyContent: 'center',
        textAlign: "center",
    },
    buttonSection: {
        marginTop: '8%',
        height: '8%',
        width: '40%',
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 8,
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        textAlignVertical: 'center'
    },
    Alert_Main_View: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
    },
    Alert_Title: {
        fontSize: 25,
        color: "#000",
        textAlign: 'center',
        padding: 10,
        height: '28%'
    },
    Alert_Message: {
        fontSize: 22,
        color: "#000",
        textAlign: 'center',
        padding: 10,
        height: '42%',
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    }
});
