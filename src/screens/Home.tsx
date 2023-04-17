import React, {FunctionComponent, useCallback} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../components/Text';
import Button from '../components/Button';
import Colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import {logoutUser} from '../db/user';

const HomeScreen: FunctionComponent = () => {
  const onLogoutPress = useCallback(() => {
    logoutUser();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.jadeGreen}
      />
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <Text style={styles.title} bold size={40} color={Colors.jadeGreenPlus1}>
          Welcome, username
        </Text>
        <Text
          style={styles.subtitle}
          size={16}
          color={Colors.neutralSecondaryText}>
          We're happy that you comeback!
        </Text>
        <Button onPress={onLogoutPress} text={'Log Me Out'} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
