/* eslint-disable react/destructuring-assignment */
/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, Box, Flex, Text, Heading } from 'theme-ui';
import Modal from '../new/elements/Modal';
import { SettingsModalItems } from '../new/elements/PageWrapperWithStage/MenuItems';

const SettingsModal = (props: { isOpen: boolean; onClose(): void; selected: string }) => {
  const [selected, setSelected] = React.useState(props.selected);
  console.log(selected);

  React.useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  React.useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} variant="dark" type="settings">
      <Flex>
        <Box sx={{ width: '30%' }}>
          <Heading ml={3} mb={3}>
            Settings
          </Heading>
          {SettingsModalItems.map((item, i) => {
            return (
              <Flex
                key={i}
                py={2}
                sx={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  mr: 3,
                  padding: 2,
                  pl: 3,
                  bg: selected === item.href && 'gray.3',
                  borderRadius: selected === item.href && '0px 24px 24px 0px',
                  ':hover': {
                    bg: 'gray.2',
                    borderRadius: '0px 24px 24px 0px',
                  },
                }}
                onClick={() => setSelected(item.href)}
              >
                {item.icon}
                <Text variant="title" sx={{ color: 'text' }} ml={2}>
                  {item.label}
                </Text>
              </Flex>
            );
          })}
        </Box>
        <Box sx={{ width: '70%', ml: 3, mr: 4 }}>
          {SettingsModalItems.map((item) => {
            return item.href === selected ? item.content : null;
          })}
        </Box>
      </Flex>
    </Modal>
  );
};

export default SettingsModal;