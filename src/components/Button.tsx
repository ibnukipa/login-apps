import React, {FunctionComponent, memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../theme/colors';
import Text from './Text';

type Props = {
  text: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

const Button: FunctionComponent<Props> = memo(
  ({text, disabled, isLoading, style, ...props}) => {
    return (
      <TouchableOpacity
        {...props}
        disabled={disabled}
        activeOpacity={0.75}
        style={[
          buttonStyle.container,
          disabled && buttonStyle.disabledContainer,
          style,
        ]}>
        {isLoading ? (
          <ActivityIndicator color={Colors.neutralWhite} />
        ) : (
          <Text size={16} bolder color={Colors.neutralWhite}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

const buttonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.jadeGreen,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  disabledContainer: {
    backgroundColor: Colors.neutralPlaceholder,
  },
});

Button.displayName = 'Button';

export default Button;
