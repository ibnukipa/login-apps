import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '../theme/colors';

const InputPin = memo<{
  autoFocus?: boolean;
  isPinFailed: boolean;
  onInputRefAssign: any;
  onInputChange: any;
  onKeyPress: any;
  isLoading?: boolean;
}>(
  ({
    autoFocus,
    isPinFailed,
    onInputRefAssign,
    onInputChange,
    onKeyPress,
    isLoading,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const onFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const onBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    return (
      <TextInput
        editable={!isLoading}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={onInputRefAssign}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        keyboardType={'numeric'}
        caretHidden
        blurOnSubmit
        maxLength={1}
        style={[
          styles.input,
          isFocused && styles.inputActive,
          isPinFailed && styles.inputError,
          isPinFailed && autoFocus && styles.inputErrorFirst,
        ]}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: Colors.neutralBorder,
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 100,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.neutralSecondaryText,
    fontWeight: '700',
    flex: 1,
    marginHorizontal: 12,
  },
  inputActive: {
    borderColor: Colors.jadeGreenPlus1,
  },
  inputErrorFirst: {
    borderColor: Colors.crimsonRed,
  },
  inputError: {
    backgroundColor: Colors.crimsonRedMin3,
    borderColor: Colors.crimsonRedMin3,
  },
});

InputPin.displayName = 'InputPin';

export default InputPin;
