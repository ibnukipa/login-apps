import React, {FunctionComponent, useCallback} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../components/Text';
import Button from '../components/Button';
import Colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import {logoutUser} from '../db/user';
import {useUser} from '../hooks/useRegistrationDB';

const HomeScreen: FunctionComponent = () => {
  const [user] = useUser();
  const onLogoutPress = useCallback(() => {
    logoutUser();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <Text style={styles.title} bold size={40} color={Colors.jadeGreenPlus1}>
          Welcome, {user.username}
        </Text>
        <Text
          style={styles.subtitle}
          size={16}
          color={Colors.neutralSecondaryText}>
          We're happy you're back!
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
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
