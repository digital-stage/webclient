/* eslint-disable react/destructuring-assignment */
/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { Box, Flex, jsx } from 'theme-ui';
import GroupView from './GroupView';
import { useCurrentStageId, useGroupsByStage } from '../../lib/use-digital-stage/hooks';
import ConductorsView from './ConductorsView';

const StageView = (): JSX.Element => {
  const stageId = useCurrentStageId();
  const groups = useGroupsByStage(stageId);

  return (
    <Box
      sx={{
        width: ['calc(100vw - 10px)', 'calc(100vw - 80px)'],
        height: 'calc(100vh - 72px)',
        pb: 9,
        px: 4,
        overflowY: 'auto',
        '::-webkit-scrollbar': {
          width: '5px',
          bg: 'transparent',
        },
        '::-webkit-scrollbar-track': {
          bg: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          bg: 'gray.3',
          borderRadius: 'card',
        },
      }}
    >
      <Flex sx={{ flexWrap: 'wrap' }}>
        {groups &&
          groups.map((group) => {
            return <GroupView key={group._id} group={group} />;
          })}
      </Flex>
      <ConductorsView />
    </Box>
  );
};

export default StageView;
