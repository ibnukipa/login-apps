import React, {FunctionComponent, memo} from 'react';
import {StyleSheet, Text as RNText, TextProps} from 'react-native';
import Colors from '../theme/colors';

type Props = {
  bold?: boolean;
  bolder?: boolean;
  heavy?: boolean;
  light?: boolean;
  lighter?: boolean;
  size?: number;
  color?: string;
} & TextProps;

const Text: FunctionComponent<Props> = memo(
  ({
    bold,
    bolder,
    heavy,
    light,
    lighter,
    size = 14,
    color = Colors.neutralMainText,
    style,
    ...props
  }) => {
    return (
      <RNText
        {...props}
        style={[
          textStyles.text,
          bold && textStyles.bold,
          bolder && textStyles.bolder,
          heavy && textStyles.heavy,
          light && textStyles.light,
          lighter && textStyles.lighter,
          {
            color: color,
            fontSize: size,
            lineHeight: size + 10,
          },
          style,
        ]}
      />
    );
  },
);

const textStyles = StyleSheet.create({
  text: {},
  bold: {
    fontWeight: '500',
  },
  bolder: {
    fontWeight: '600',
  },
  heavy: {
    fontWeight: '700',
  },
  light: {
    fontWeight: '200',
  },
  lighter: {
    fontWeight: '100',
  },
});

Text.displayName = 'Text';

export default Text;
