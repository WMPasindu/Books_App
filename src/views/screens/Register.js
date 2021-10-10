import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import BackGround from '../../components/BackGround';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import colors from '../../const/colors';
import { AuthContext } from '../navigators/AuthProvider';

const Login = ({navigation}) => {
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register} = useContext(AuthContext);

  return (
    <BackGround>
      <View style={{position: 'absolute', top: 40, left: 20}}>
        <Text style={styles.welcome}>Hey</Text>
        <Text style={styles.welcome}>There !</Text>
      </View>
      <View style={{height:"100%",justifyContent:"center"}}>
        <View style={styles.form}>
        <View style={{alignItems: 'center'}}>
            <TextInput
              placeholderTextColor={'#252525'}
              placeholder="Name"
              color={colors.black}
              value={name}
              onChangeText={(text) => setname(text)}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholderTextColor={'#252525'}
              placeholder="Mobile"
              color={colors.black}
              value={mobile}
              onChangeText={(text) => setmobile(text)}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholderTextColor={'#252525'}
              placeholder="Username"
              color={colors.black}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholderTextColor={'#252525'}
              placeholder="Password"
              color={colors.black}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View style={styles.loginButton}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: 25,
              }}>
              Register
            </Text>
          </View>
          <TouchableOpacity onPress={() => register(email, password, name, mobile)}>
            <View style={styles.loginIcon}>
              <Image
                source={require('../../assets/arrow.png')}
                style={{height: 30, width: 30}}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: height * 0.05,
            marginHorizontal:30,
            marginRight: 50
          }}>
          <View>
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: colors.primary,
                borderBottomWidth: 1,
                fontSize: 16,
              }}>
              Sign In
            </Text>
          </View>
          {/* <View>
            <Text
              onPress={() => console.log('pressed')}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: colors.black,
                borderBottomWidth: 1,
              }}>
              Forgot Password
            </Text>
          </View> */}
        </View>
      </View>
    </BackGround>
  );
};

const styles = StyleSheet.create({
  welcome: {
    color: colors.text,
    textAlign: 'left',
    fontSize: 36,
    fontWeight: 'bold',
  },
  form: {
  },
  input: {
    marginTop: height * 0.02,
    width: width - 50,
    borderBottomWidth: 1.5,
    fontSize: 20,
  },
  loginButton: {
    marginTop: height * 0.04,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  loginIcon: {
    height: 40,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;