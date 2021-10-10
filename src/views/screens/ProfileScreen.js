import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import COLORS from '../../const/colors';
import { AuthContext } from '../navigators/AuthProvider';

const Profile = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const navigations = useNavigation();
    const [userData, setUserData] = useState([]);
    const [recents, setRecents] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [favourits, setFavourits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resourcePath, setResourcePath] = useState(user.photoURL)

    const getData = () => {
        database()
            .ref('/users/')
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                setUserData(snapshot.val());
                setLoading(false)
            });
    }

    const getRecentData = () => {
        database()
            .ref('/recent/')
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                setRecents(snapshot.val());
                setLoading(false)
            });
    }

    const getFavouritsData = () => {
        database()
            .ref('/favourits/')
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                setFavourits(snapshot.val());
                setLoading(false)
            });
    }

    const getDownloadsData = () => {
        database()
            .ref('/downloads/')
            .once('value')
            .then(snapshot => {
                console.log('User data: ', snapshot.val());
                setDownloads(snapshot.val());
                setLoading(false)
            });
    }

    const chooseFile = () => {
        const options = {
            title: 'Select an option',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // let source = response;
                // You can also display the image using data:
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response.assets[0].uri));
                setResourcePath(response.assets[0].uri);
            }
        });
    };


    useEffect(() => {
        getData();
        getRecentData();
        getFavouritsData();
        getDownloadsData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <ActivityIndicator animating={true} size="large" color="#138A8A" style={{
                alignItems: 'center', justifyContent: 'center'
            }} /> :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.titleBar}>
                        <TouchableOpacity onPress={() => navigations.goBack()}>
                            <Icon name="arrow-left" size={30} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <View style={styles.profileImage}>
                            <Image source={{ uri: resourcePath }} style={styles.image} ></Image>
                        </View>
                        <View style={styles.active}></View>

                        <View style={styles.add}>
                            <TouchableOpacity onPress={() => chooseFile()}>
                                <Icon name="camera" size={15} color={COLORS.grey} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.iconBar}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 26 }]}>{user.displayName}</Text>
                            <Icon name="account-edit" size={22} color={COLORS.grey} style={{ marginLeft: 10 }} />
                        </View>
                        <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{userData[0].role}</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>{downloads.length}</Text>
                            <Text style={[styles.text, styles.subText]}>Downloads</Text>
                        </View>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[styles.text, { fontSize: 24 }]}>{favourits.length}</Text>
                            <Text style={[styles.text, styles.subText]}>Favourits</Text>
                        </View>
                    </View>
                    <Text style={{
                        marginLeft: 20, marginTop: 15, fontSize: 15,
                        color: "#AEB5BC",
                    }}>Profile Data</Text>
                    <View style={styles.personalSection}>
                        <View style={styles.personalDara}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                keyboardType="text"
                                value={user.displayName}
                            />
                        </View>

                        <View style={styles.personalDara}>
                            <TextInput
                                style={styles.input}
                                placeholder="phone"
                                value={userData[0].phone}
                            />
                        </View>

                        <View style={styles.personalDara}>
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                keyboardType="text"
                                value={user.email}
                            />
                        </View>

                        <View style={styles.personalDara}>
                            <TextInput
                                style={styles.input}
                                placeholder="Address"
                                keyboardType="text"
                                value={userData[0].address}
                            />
                        </View>
                    </View>
                    <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                    <View style={{ marginLeft: 30, marginTop: 5 }}>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                    Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                    Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: 'center', alignSelf: "center",
        alignItems: "center",
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: "hidden"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 0,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 35,
        height: 35,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    recent: {
        marginLeft: 28,
        fontSize: 15
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10
    },
    personalDara: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 5,
        borderWidth: 1,
        borderColor: COLORS.black
    },
    personalSection: {
        flex: 1,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 20,
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    input: {
        borderColor: COLORS.black,
    }
});

export default Profile;