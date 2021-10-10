import React from 'react';
import {
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../const/colors';

const DetailsScreen = ({ navigation, route }) => {
  const resources = route.params;

  const alertDialog = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("Cancel Pressed")},
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={{ height: 400, backgroundColor: COLORS.background }}>
        <ImageBackground
          resizeMode="contain"
          source={{ uri: resources.image }}
          style={{
            height: 300,
            top: 20,
          }}>
          {/* Render  Header */}
          <View style={style.header}>
            <Icon
              name="arrow-left"
              size={28}
              color={COLORS.dark}
              onPress={navigation.goBack}
            />
            <Icon name="dots-vertical" size={28} color={COLORS.dark} />
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          {/* Pet name and gender icon */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{ fontSize: 20, color: COLORS.dark, fontWeight: 'bold' }}>
              {resources?.title}
            </Text>
            <Icon name={resources?.icon} size={25} color={COLORS.grey} />
          </View>

          {/* Render Pet type and age */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="star-face" color={COLORS.yellow} size={20} />
              <Text style={{ fontSize: 14, color: COLORS.grey, marginLeft: 5 }}>
                {resources?.rating}
              </Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Icon name="currency-usd" color={COLORS.primary} size={18} />
              <Text style={{ fontSize: 12, color: COLORS.grey, marginLeft: 5 }}>
                {resources?.price.displayValue}
              </Text>
            </View>
          </View>

          {/* Render location and icon */}
          {/* <View style={{ marginTop: 5, flexDirection: 'row' }}>
            <Icon name="star-face" color={COLORS.yellow} size={20} />
            <Text style={{ fontSize: 14, color: COLORS.grey, marginLeft: 5 }}>
              5.0
            </Text>
          </View> */}
        </View>
      </View>

      {/* Comment container */}
      <View style={{ marginTop: 80, justifyContent: 'space-between', flex: 1 }}>
        <View>
          {/* Render user image , name and date */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <Image
              source={require('../../assets/person.jpg')}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text
                style={{ color: COLORS.dark, fontSize: 12, fontWeight: 'bold' }}>
                {resources?.author}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                Author
              </Text>
            </View>
            <Text style={{ color: COLORS.grey, fontSize: 12 }}>{resources?.publishedDate}</Text>
          </View>
          <ScrollView style={style.scrollview}>
            <Text style={style.comment}>
              {resources?.summary}
            </Text>
          </ScrollView>
        </View>

        {/* Render footer */}
        <View style={style.footer}>
          <View style={style.iconCon}>
            <TouchableOpacity onPress={() => alertDialog("Add To Favourit", "Would you like add this item as favourite?")}>
            <Icon name="heart-outline" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={style.btn}>
            <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
              DOWNLOAD
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    flex: 1,
    bottom: -60,
    borderRadius: 18,
    elevation: 10,
    padding: 20,
    justifyContent: 'center',
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
    textAlignVertical: "center",
    textAlign: "justify",
  },
  scrollview: {
    height: 200,
    marginHorizontal: 20,
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
});
export default DetailsScreen;
