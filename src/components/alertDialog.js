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
  
export default function alertDialog  (title, message) {
    return (Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteProduct() },
      ],
      { cancelable: false }
    ));
  }