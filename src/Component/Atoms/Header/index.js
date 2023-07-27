import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../../Utils';
import { Fire } from '../../../config';
import { LogBox } from 'react-native';
import { Dummy } from '../../../Assets';

const { height, width } = Dimensions.get('window');

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const Header = () => {
  const [user, setUser] = useState({});
  const [masuk, setMasuk] = useState({});
  const [on, setOn] = useState(false);
  const navigation = useNavigation();
  //algorithm profile if user login with email google or register
  useEffect(() => {
    if (masuk) {
      const data = {
        Dummy,
        user: 'Agus Alfandi',
      };

      setOn(true);
      setUser(data);
    } else {
      getData('user')
        .then((res) => {
          const data = {
            name: res.displayName,
            photo: { uri: res.photoURL },
          };

          setUser(data);
          setOn(false);
        })
        .catch((error) => {
          console.log('error user google: ', error);
        });
    }
  }, [masuk]);

  useEffect(() => {
    getData('email')
      .then((res) => {
        setMasuk(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const SignOut = async () => {
    if (masuk) {
      Fire.auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('email')
            .then(() => {
              navigation.replace('Login');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log('email gagal logout', error);
        });
    } else {
      await auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('user').then(() => {
            navigation.replace('Login');
          });
        })
        .catch((error) => {
          console.log('account google error: ', error);
        });
    }
  };

  return (
    <View style={styles.Header}>
      {on && (
        <View style={styles.profile}>
          <View style={styles.boderPic}>
            <Image source={user.Dummy} style={styles.pic} />
          </View>
          <View>
            <Text style={styles.title}>{user.user}</Text>
          </View>
        </View>
      )}

      {!on && (
        <View style={styles.profile}>
          <View style={styles.boderPic}>
            <Image source={user.photo} style={styles.pic} />
          </View>
          <View>
            <Text style={styles.title}>{user.name}</Text>
          </View>
        </View>
      )}

      <View style={styles.SignOut}>
        <TouchableOpacity onPress={SignOut}>
          <FontAwesomeIcon icon={faSignOut} size={32} style={styles.logOut} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#0442D0',
    height: 108,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  boderPic: { paddingLeft: 18, paddingRight: 20 },
  pic: { height: 56, width: 56, borderRadius: 56 / 2 },
  title: { fontSize: 15, fontWeight: '500', color: 'white', width: 150 },
  SignOut: { padding: 10 },
  logOut: { color: 'white' },
});
