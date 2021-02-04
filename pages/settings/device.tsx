/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import SettingsLayout from '../../components/layout/SettingsLayout';
import SettingsNavigation from '../../components/settings/SettingsNavigation';
import SettingsPanel from '../../components/settings/SettingsPanel';
import { Box, Checkbox, Divider, Grid, Heading, jsx, Label } from 'theme-ui';
import useDigitalStage, {
  Device,
  useLocalDevice,
  useSelector,
  useStageActions,
} from '../../lib/use-digital-stage';
import SingleSelect from '../../digitalstage-ui/extra/SingleSelect';
import { useIntl } from 'react-intl';

const DeviceSettings = (): JSX.Element => {
  const { refreshLocalDevice } = useDigitalStage();
  const localDevice = useLocalDevice();
  const { updateDevice } = useStageActions();
  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });

  return (
    <SettingsLayout>
      <SettingsPanel>
        <SettingsNavigation />

        {localDevice && (
          <React.Fragment>
            <Grid
              sx={{
                py: 3,
                px: 5,
                alignItems: 'center',
              }}
              gap={6}
              columns={['1fr', '1fr 2fr']}
            >
              <Heading variant="h5">{f('microphone')}</Heading>
              <SingleSelect
                options={localDevice.inputAudioDevices || []}
                defaultValue={localDevice.inputAudioDeviceId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateDevice(localDevice._id, {
                    inputAudioDeviceId: localDevice.inputAudioDevices[e.target.selectedIndex].id,
                  })
                }
              />

              <Heading variant="h5">{f('speaker')}</Heading>
              <SingleSelect
                options={localDevice.outputAudioDevices || []}
                defaultValue={localDevice.outputAudioDeviceId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  updateDevice(localDevice._id, {
                    outputAudioDeviceId: localDevice.outputAudioDevices[e.target.selectedIndex].id,
                  });
                }}
              />

              <Heading variant="h5">{f('additionalOptions')}</Heading>
              <Box>
                <Label>
                  <Checkbox
                    checked={localDevice.echoCancellation || false}
                    defaultChecked={localDevice.echoCancellation || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateDevice(localDevice._id, {
                        echoCancellation: e.currentTarget.checked,
                      });
                    }}
                  />
                  {f('echoCancellation')}
                </Label>
                <Label>
                  <Checkbox
                    checked={localDevice.autoGainControl || false}
                    defaultChecked={localDevice.autoGainControl || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateDevice(localDevice._id, {
                        autoGainControl: e.currentTarget.checked,
                      });
                    }}
                  />
                  {f('autoGainControl')}
                </Label>
                <Label>
                  <Checkbox
                    checked={localDevice.noiseSuppression || false}
                    defaultChecked={localDevice.noiseSuppression || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateDevice(localDevice._id, {
                        noiseSuppression: e.currentTarget.checked,
                      });
                    }}
                  />
                  {f('noiseSuppression')}
                </Label>
              </Box>
            </Grid>
          </React.Fragment>
        )}
        <Divider sx={{ color: 'text' }} />
      </SettingsPanel>
    </SettingsLayout>
  );
};
export default DeviceSettings;