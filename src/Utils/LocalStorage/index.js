import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    // console.log('sukses menyimpan');
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      // console.warn('suskses memanggil');
      const data = JSON.parse(jsonValue);
      // console.log('data async :', data.);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
