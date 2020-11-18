/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import { jsx, Flex, Box, Heading, IconButton } from 'theme-ui';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import OnlineStatus from '../OnlineStatus';
import {
  ExtendedStageMember,
  useIsStageAdmin,
} from '../../../../lib/digitalstage/useStageSelector';
import useStageActions from '../../../../lib/digitalstage/useStageActions';
import VideoPlayer from '../VideoPlayer';

const StageMemberTitle = (props: { stageMember: ExtendedStageMember }) => {
  const { stageMember } = props;

  const { updateStageMember } = useStageActions();
  const isAdmin = useIsStageAdmin();

  return (
    <Box
      sx={{
        minWidth: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      {/** <Avatar name={stageMember.name} /> */}

      <Heading as="h5">
        <OnlineStatus online={stageMember.online} /> {stageMember.name}{' '}
      </Heading>

      {isAdmin && (
        <IconButton
          onClick={() =>
            updateStageMember(stageMember._id, {
              isDirector: !props.stageMember.isDirector,
            })
          }
        >
          {stageMember.isDirector ? <FaVideo /> : <FaVideoSlash />}
        </IconButton>
      )}
    </Box>
  );
};

const StageMemberView = ({ stageMember }: { stageMember: ExtendedStageMember }): JSX.Element => {
  return (
    <Flex
      sx={{
        position: 'relative',
        backgroundImage: 'url("/images/white_logo.png")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '20%',
        bg: 'lightblue',
      }}
    >
      <Box sx={{ pt: '100%' }} />
      {stageMember.videoConsumers.length > 0 && (
        <VideoPlayer
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          consumers={stageMember.videoConsumers}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <StageMemberTitle stageMember={stageMember} />
      </Box>
    </Flex>
  );
};

export default StageMemberView;