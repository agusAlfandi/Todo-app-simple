import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../Utils';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.loadingBackground,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: { color: colors.primary, fontSize: 18, fontWeight: '600' },
});
