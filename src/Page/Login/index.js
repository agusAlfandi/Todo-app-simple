import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Loading } from '../../Component';
import { Fire } from '../../config';
import { colors, storeData, useForm } from '../../Utils';

const { height, width } = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: '736253118637-poc994itiqvdc6csqmt6djnu6noqtqo6.apps.googleusercontent.com',
});

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({
    email: '',
    pass: '',
  });
  const [loading, setLoading] = useState(false);

  // Login with auth google
  const onGoogleButtonPress = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const login = await auth()
        .signInWithCredential(googleCredential)
        .then((res) => {
          navigation.replace('Home');
          storeData('user', res.user);
        });
    } catch (error) {
      console.log('Cannot login: ', error);
    }
  };

  // Login auth with Email and Password
  const Send = () => {
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.pass)
      .then((userCredential) => {
        setLoading(false);
        const data = {
          login: userCredential.user.email,
        };
        storeData('email', data);
        navigation.replace('Home');
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.log('error: ', errorMessage);
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: height }}
      >
        <View style={styles.firstTitle}>
          <Text style={styles.title}>TODO APP</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Sign In</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.textinput}
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <TextInput
            placeholder="Password"
            style={styles.textinput}
            value={form.pass}
            onChangeText={(value) => setForm('pass', value)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.register} onPress={Send}>
            <Text style={styles.req}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.LoginWith}>
          <View style={styles.google}>
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleButtonPress}
            />

            {/* <Button title="Google Sign-Out" onPress={() => signOut()} /> */}
          </View>
          <View style={styles.signUp}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  firstTitle: {
    height: height - 490,
    justifyContent: 'center',
    // backgroundColor: 'blue',
    alignItems: 'center',
    width: width,
  },
  title: { fontSize: 80, color: 'black' },
  content: {
    // flex: 1,
    backgroundColor: colors.primary,
    width: width - 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    height: height - 450,
  },
  subtitle: { fontSize: 20, fontWeight: 'bold', paddingBottom: 15, width: '80%' },
  textinput: { borderWidth: 1, borderColor: '#e0e0e0', margin: 5, width: '80%', borderRadius: 8 },
  register: {
    backgroundColor: '#a4c7e3',
    paddingHorizontal: 45,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 8,
    // marginBottom: 20,
  },
  LoginWith: {
    // flex: 1,
    // backgroundColor: 'red',
    height: height - 500,
    flexDirection: 'row',
    paddingHorizontal: 50,
    width: width,
    alignItems: 'center',
  },
  google: { flex: 1 },
  signUp: {
    backgroundColor: colors.primary,
    marginTop: 4,
    height: 43,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 4,
  },
});
