import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import Colors from '../theme/colors';
import Text from './Text';

type Props = {
  errorMessage?: string;
} & TextInputProps;

const InputText: FunctionComponent<Props> = ({
  errorMessage,
  ...props
}: Props) => {
  return (
    <View>
      <RNTextInput
        {...props}
        placeholderTextColor={Colors.neutralPlaceholder}
        style={[
          textInputStyle.textInput,
          errorMessage ? textInputStyle.textInputError : null,
        ]}
      />
      {errorMessage && (
        <View style={textInputStyle.errorMessage}>
          <Text size={12} color={Colors.crimsonRed}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const textInputStyle = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.neutralWhite,
    height: 50,
    marginBottom: 24,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.jadeGreenMin2,
    fontSize: 16,
    color: Colors.neutralMainText,
  },
  textInputError: {
    borderColor: Colors.crimsonRedMin2,
  },
  errorMessage: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
});

InputText.displayName = 'InputText';

export default InputText;
