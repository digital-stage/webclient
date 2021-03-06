/** @jsxRuntime classic */
/** @jsx jsx */
import { useAuth } from '../lib/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import StageListView from '../components/stages/StagesList';
import { Flex, Heading, jsx } from 'theme-ui';
import StagesPanel from '../components/stages/StagesPanel';
import { useIntl } from 'react-intl';
import StagesLayout from '../components/layout/StagesLayout';
import { useSelector } from '../lib/use-digital-stage';

const Stages = (): JSX.Element => {
  const router = useRouter();
  const { loading, user } = useAuth();
  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/account/welcome');
    }
  }, [loading, user]);

  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        maxWidth: 'container.stage',
      }}
    >
      <Heading as="h1" sx={{ ml: 4, mt: [6, 7] }}>
        {f('myStages')}
      </Heading>

      <StagesPanel>
        <StageListView />
      </StagesPanel>
    </Flex>
  );
};

Stages.Layout = StagesLayout;
export default Stages;
