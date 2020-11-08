import React, { useState } from 'react';
import { styled } from 'styletron-react';
import { ChevronLeft, ChevronRight } from 'baseui/icon';
import { Caption1 } from 'baseui/typography';
import useStageSelector, { useIsStageAdmin } from '../../../../../lib/digitalstage/useStageSelector';
import { CustomStageMember, StageMember, User } from '../../../../../lib/digitalstage/common/model.server';
import ChannelStrip from '../../ChannelStrip';
import useStageActions from '../../../../../lib/digitalstage/useStageActions';
import AudioProducerChannel from './AudioProducerChannel';
import { useStageWebAudio } from '../../../../../lib/useStageWebAudio';
import Button from '../../../../../uikit/Button';

const Panel = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
});
const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
});
const InnerRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgba(100,100,130,1)',
  borderRadius: '20px',
  height: '100%',
});
const Column = styled('div', {
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  height: '100%',
});
const ColumnWithChildren = styled('div', {
  height: '100%',
});
const Header = styled('div', {
  width: '100%',
  height: '64px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StageMemberChannel = (props: {
  stageMemberId: string
}) => {
  const { stageMemberId } = props;
  const isAdmin: boolean = useIsStageAdmin();
  const stageMember = useStageSelector<StageMember>(
    (state) => state.stageMembers.byId[props.stageMemberId],
  );
  const customStageMember = useStageSelector<CustomStageMember>(
    (state) => (state.customStageMembers.byStageMember[props.stageMemberId]
      ? state.customStageMembers.byId[state.customStageMembers.byStageMember[props.stageMemberId]]
      : undefined),
  );
  const user = useStageSelector<User>((state) => state.users.byId[stageMember.userId]);
  const audioProducers = useStageSelector<string[]>(
    (state) => (state.audioProducers.byStageMember[props.stageMemberId]
      ? state.audioProducers.byStageMember[props.stageMemberId]
      : []),
  );

  const { byStageMember } = useStageWebAudio();

  const { updateStageMember, setCustomStageMember, removeCustomStageMember } = useStageActions();

  const [expanded, setExpanded] = useState<boolean>();

  return (
    <Panel>
      <Column>
        <ChannelStrip
          addHeader={(
            <Header>
              {audioProducers.length > 0 ? (
                <Button
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  shape="pill"
                  kind="minimal"
                  endEnhancer={() => (expanded ? <ChevronLeft /> : <ChevronRight />)}
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  <Caption1>{user.name}</Caption1>
                </Button>
              ) : (
                <Caption1>{user.name}</Caption1>
              )}
            </Header>
                      )}
          volume={stageMember.volume}
          muted={stageMember.muted}
          customVolume={customStageMember ? customStageMember.volume : undefined}
          customMuted={customStageMember ? customStageMember.muted : undefined}
          analyser={byStageMember[stageMemberId]
            ? byStageMember[stageMemberId].analyserNode : undefined}
          onVolumeChanged={(volume, muted) => updateStageMember(stageMember._id, {
            volume,
            muted,
          })}
          onCustomVolumeChanged={(volume, muted) => setCustomStageMember(stageMember._id, {
            volume,
            muted,
          })}
          onCustomVolumeReset={() => {
            if (customStageMember) return removeCustomStageMember(customStageMember._id);
            return null;
          }}
          isAdmin={isAdmin}
        />
      </Column>

      {expanded && audioProducers && (
        <Row>
          <InnerRow>
            {audioProducers.map((id) => (
              <ColumnWithChildren>
                <AudioProducerChannel key={id} audioProducerId={id} />
              </ColumnWithChildren>
            ))}
          </InnerRow>

        </Row>
      )}
    </Panel>
  );
};
export default StageMemberChannel;
