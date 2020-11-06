/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { jsx, Input, Label, Box, Text } from 'theme-ui';
import { ErrorMessage } from 'formik';

// TODO: add TS interface / type
const InputField = ({ id, label, name, error, ...rest }) => (
  <Box sx={{ mt: 4 }}>
    <Label
      for
      id={id}
      sx={{
        fontSize: 12,
        color: 'muted',
        pl: 2,
        bg: error && '#9D131364',
      }}
    >
      {label}
    </Label>
    <Input
      id={id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={{
        bg: error ? 'error.background' : 'transparent',
        color: 'text',
        border: 'transparent',
        borderBottom: '1px solid transparent',
        borderBottomColor: error ? 'error.bottomBorder' : 'text',
        borderRadius: 0,
        width: '100%',
        ':active,:-webkit-autofill': {
          borderBottomColor: 'text',
          // ThemeUI color does not work on this prop
          '-webkit-text-fill-color': 'white',
          boxShadow: '0 0 0px 1000px #1c1c1c inset',
        },
      }}
    />
    <ErrorMessage
      name={name}
      render={(msg) => (
        <Text
          sx={{
            fontSize: 10,
            color: '#707070',
            pt: 1,
          }}
        >
          {msg}
        </Text>
      )}
    />
  </Box>
);

export default InputField;
