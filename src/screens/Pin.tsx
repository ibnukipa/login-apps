import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../components/Text';
import Colors from '../theme/colors';
import globalStyles from '../theme/globalStyles';
import {useNavigation, useRoute} from '@react-navigation/native';
import InputPin from '../components/InputPin';
import Timer, {TimerRef} from '../components/Timer';

const PinScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const inputRefs = useRef<Map<number, TextInput>>(new Map());
  const inputValues = useRef<Map<number, string>>(new Map());
  const timerRef = useRef<TimerRef>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isPinFailed, setIsPinFailed] = useState<boolean>(false);
  const [isEnableResendOtp, setIsEnableResendOtp] = useState<boolean>(false);

  const onTimerFinished = useCallback(() => {
    setIsEnableResendOtp(true);
  }, []);

  const onResendOtpPress = useCallback(() => {
    timerRef.current?.restart();
    setIsEnableResendOtp(false);
  }, []);

  const onInputRefAssign = useCallback(
    (index: number) => (ref: TextInput) => {
      inputRefs.current.set(index, ref);
    },
    [],
  );

  const onInputChange = useCallback(
    (index: number) =>
      ({nativeEvent: {text}}: any) => {
        setIsPinFailed(false);
        if (text) {
          inputValues.current.set(index, text);
          if (index < 5) {
            const nextIndex = index + 1;
            inputRefs.current.get(nextIndex)?.focus();
          } else {
            setIsSubmitting(true);
            Keyboard.dismiss();
          }
        }
      },
    [],
  );

  const onKeyPress = useCallback(
    (index: number) =>
      ({nativeEvent: {key: keyValue}}: any) => {
        if (keyValue === 'Backspace') {
          if (inputValues.current.has(index)) {
            inputValues.current.delete(index);
            inputRefs.current.get(index)?.clear();
          } else if (index > 0) {
            const nextIndex = index - 1;
            inputRefs.current.get(nextIndex)?.focus();
          }
        }
      },
    [],
  );

  const onSuccess = useCallback(() => {
    if (route?.params?.callback) {
      route?.params?.callback();
    } else {
      navigation.goBack();
    }
  }, [route?.params, navigation]);

  const onFailure = useCallback(() => {
    setIsPinFailed(true);
    inputValues.current = new Map();
    inputRefs.current.get(5)?.clear();
    inputRefs.current.get(4)?.clear();
    inputRefs.current.get(3)?.clear();
    inputRefs.current.get(2)?.clear();
    inputRefs.current.get(1)?.clear();
    inputRefs.current.get(0)?.clear();
    setTimeout(() => {
      inputRefs.current.get(0)?.focus();
    }, 300);
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      setTimeout(() => {
        setIsSubmitting(false);
        if (Array.from(inputValues.current.values()).join('') === '111111') {
          onSuccess();
        } else {
          onFailure();
        }
      }, 2000);
    }
  }, [isSubmitting, onFailure, onSuccess]);

  const isResendOtpEnable = useMemo(() => {
    return isEnableResendOtp && !isSubmitting;
  }, [isEnableResendOtp, isSubmitting]);

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.black} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
        style={styles.keyboard}>
        <SafeAreaView
          edges={['bottom']}
          style={[globalStyles.container, styles.container]}>
          <View>
            <Text
              heavy
              size={18}
              color={Colors.jadeGreenPlus1}
              style={styles.title}>
              Enter authentication code
            </Text>
            <Text color={Colors.neutralSecondaryText} style={styles.subtitle}>
              Enter the 6-digit that we have sent via the phone number to
              <Text bolder color={Colors.neutralSecondaryText}>
                {' '}
                +62 882-2560-0000
              </Text>
            </Text>
            <View style={styles.inputContainer}>
              <InputPin
                autoFocus
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(0)}
                onInputChange={onInputChange(0)}
                onKeyPress={onKeyPress(0)}
              />
              <InputPin
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(1)}
                onInputChange={onInputChange(1)}
                onKeyPress={onKeyPress(1)}
              />
              <InputPin
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(2)}
                onInputChange={onInputChange(2)}
                onKeyPress={onKeyPress(2)}
              />
              <InputPin
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(3)}
                onInputChange={onInputChange(3)}
                onKeyPress={onKeyPress(3)}
              />
              <InputPin
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(4)}
                onInputChange={onInputChange(4)}
                onKeyPress={onKeyPress(4)}
              />
              <InputPin
                isLoading={isSubmitting}
                isPinFailed={isPinFailed}
                onInputRefAssign={onInputRefAssign(5)}
                onInputChange={onInputChange(5)}
                onKeyPress={onKeyPress(5)}
              />
            </View>
            {isSubmitting && (
              <ActivityIndicator
                color={Colors.jadeGreenPlus1}
                style={styles.loader}
                size={'large'}
              />
            )}
          </View>
          <SafeAreaView edges={['bottom']} style={styles.timerContainer}>
            <Timer
              ref={timerRef}
              onFinished={onTimerFinished}
              defaultTimer={30}
            />
            <Text
              onPress={isResendOtpEnable ? onResendOtpPress : undefined}
              heavy
              color={
                isResendOtpEnable
                  ? Colors.jadeGreenPlus1
                  : Colors.neutralSecondaryText
              }>
              Resend Code
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 52,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginTop: 16,
  },
});

PinScreen.displayName = 'PinScreen';

export default PinScreen;
