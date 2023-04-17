import React, {FunctionComponent} from 'react';
import Text from '../components/Text';
import {StatusBar, StyleSheet} from 'react-native';
import Colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../components/InputText';
import Button from '../components/Button';
import useRegistrationForm from '../hooks/useRegistrationForm';

const RegistrationScreen: FunctionComponent = () => {
  const {
    username,
    usernameError,
    password,
    passwordError,
    onChangeUsername,
    onChangePassword,
    isRegistrationValid,
  } = useRegistrationForm();

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.neutralWhite}
      />
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <Text style={styles.title} bold size={40} color={Colors.jadeGreenPlus1}>
          Let's sign you in
        </Text>
        <Text
          style={styles.subtitle}
          size={16}
          color={Colors.neutralSecondaryText}>
          Don't have an account? No worries, just fill this form and we will
          create it for you!
        </Text>
        <InputText
          placeholder={'Username'}
          value={username}
          onChangeText={onChangeUsername}
          errorMessage={usernameError}
        />
        <InputText
          placeholder={'Password'}
          value={password}
          onChangeText={onChangePassword}
          errorMessage={passwordError}
        />
        <Button
          disabled={!username || !password || !isRegistrationValid}
          text={'Bring Me In!'}
        />
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

RegistrationScreen.displayName = 'RegistrationScreen';

export default RegistrationScreen;
