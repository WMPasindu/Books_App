import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import { AuthContext } from '../navigators/AuthProvider';
import CardView from '../../components/Card';
const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState('');
  const [message, SetMessage] = useState('');

  const getData = () => {
    database()
      .ref('/categories/')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
        setCategories(snapshot.val())
      });
  }

  const getResourceData = () => {
    database()
      .ref('/resources/')
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
        setResources(snapshot.val());
        setLoading(false)
      });
  }

  useEffect(() => {
    getData();
    getResourceData();
  }, []);

  const parentToChild = (title, message) => {
    setTitle(title);
    SetMessage(message)
  }
  
  const alertDialog = (title, message, event) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => event },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <View style={style.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }}>
          Welcome {user.displayName.split(" ")[0]}
        </Text>
        <TouchableOpacity onPress={() => alertDialog("Sign Out", "Are you sure, do you want to signout?", logout)}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ height: 30, width: 30, borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {loading ? <ActivityIndicator animating={true} size="large" color="#138A8A" style={{
          alignItems: 'center', justifyContent: 'center'
        }} /> :
          <View style={style.mainContainer}>
            {/* Render the search inputs and icons */}
            <View style={style.searchInputContainer}>
              <Icon name="magnify" size={24} color={COLORS.grey} />
              <TextInput
                placeholderTextColor={COLORS.grey}
                placeholder="Search books or Articles"
                style={{ flex: 1 }}
              />
              <Icon name="sort-ascending" size={24} color={COLORS.grey} />
            </View>

            {/* Render all the categories */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>

              {categories.map((item, index) => (
                <View key={'pet' + index} style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSeletedCategoryIndex(index);
                      // fliterPet(index);
                    }}
                    style={[
                      style.categoryBtn,
                      {
                        backgroundColor:
                          selectedCategoryIndex == index
                            ? COLORS.primary
                            : COLORS.white,
                      },
                    ]}>
                    <Icon
                      name={item.icon}
                      size={30}
                      color={
                        selectedCategoryIndex == index
                          ? COLORS.white
                          : COLORS.primary
                      }
                    />
                  </TouchableOpacity>
                  <Text style={style.categoryBtnName}>{item.name}</Text>
                </View>
              ))}
            </View>

            {/* Render the cards with flatlist */}
            <View style={{ marginTop: 20, marginBottom: 30 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={resources[selectedCategoryIndex].data}
                renderItem={({ item }) => (
                  <CardView resources={item} navigation={navigation} />
                )}
              />
            </View>
          </View>
        }
      </View>
    </SafeAreaView>
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
  }
});
export default HomeScreen;
