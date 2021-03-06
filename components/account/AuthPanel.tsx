/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import Panel from '../../digitalstage-ui/extra/Panel';

const AuthPanel = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;

  return (
    <Panel
      sx={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        px: [5, 6],
        py: 6,
        my: 4,
        mx: 'auto',
        maxWidth: 'container.tiny',
      }}
    >
      {children}
    </Panel>
  );
};

export default AuthPanel;
