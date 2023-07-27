import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Fire } from '../../config';
import { getData, storeData, useForm } from '../../Utils';
import 'firebase/compat/auth';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Loading } from '../../Component';
import { showMessage } from 'react-native-flash-message';

const { height, width } = Dimensions.get('window');
//save data with custom useState
const Register = () => {
  const [form, setForm] = useForm({
    email: '',
    pass: '',
  });
  const [loading, setLoading] = useState(false);

  const Send = () => {
    setLoading(true);
    // auth data user email and password
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.pass)
      .then((userCredential) => {
        setLoading(false);
        var user = userCredential.user;
        console.log('create user: ', user);
        setForm('reset');
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.log('error: ', errorMessage);
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
        setForm('reset');
      });
  };

  return (
    <>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: height }}>
        <View style={styles.firstTitle}>
          <Text style={styles.title}>TODO APP</Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Text style={styles.subtitle}>Sign Up</Text>
            <TextInput
              placeholder="Email"
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
              <Text style={styles.req}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  firstTitle: {
    height: height - 450,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 80, color: 'black' },
  wrapper: { height: height - 230 },
  content: {
    height: height - 450,
    backgroundColor: '#00bfff',
    width: width - 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  subtitle: { fontSize: 20, fontWeight: 'bold', paddingBottom: 15, width: '80%' },
  textinput: { borderWidth: 1, borderColor: '#e0e0e0', margin: 5, width: '80%', borderRadius: 8 },
  register: {
    backgroundColor: '#a4c7e3',
    paddingHorizontal: 45,
    paddingVertical: 10,
    marginTop: 7,
    borderRadius: 8,
  },
  req: { fontSize: 15 },
});
