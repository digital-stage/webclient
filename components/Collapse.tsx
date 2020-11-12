/* eslint-disable react/destructuring-assignment */
/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, Flex } from 'theme-ui';

interface Props {
  children: React.ReactNode;
  id: string;
}

const Collapse = ({ children, id }: Props): JSX.Element => (
  <Flex
    id={id}
    sx={{
      width: '100%',
      flexDirection: 'column',
    }}
  >
    {children}
  </Flex>
);

export default Collapse;
