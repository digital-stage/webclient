/* eslint-disable react/destructuring-assignment */
/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Button, Divider, Flex, jsx, Text } from 'theme-ui';
import { useAuth } from '../../../../../lib/digitalstage/useAuth';
import useStageSelector from '../../../../../lib/digitalstage/useStageSelector';
import { AppBarItems } from '../../PageWrapperWithStage/MenuItems';

interface Props {
  isOpen: boolean;
  onSelect(selected: string);
  onClose(selected: string);
}

const DropdownMenu = ({ isOpen, onSelect }: Props): JSX.Element => {
  const { user: authUser, logout } = useAuth();
  const { user } = useStageSelector((state) => ({ user: state.user }));

  return isOpen ? (
    <Box
      sx={{
        position: 'fixed',
        bg: 'gray.5',
        width: 'auto',
        height: 'auto',
        top: '58px',
        right: '22px',
        p: 4,
        boxShadow: '0px 3px 6px #000000BC',
        borderRadius: 'card',
        zIndex: 999,
      }}
    >
      <Text variant="title" sx={{ color: 'text', mb: 3 }}>
        {user.name}
      </Text>
      <Text variant="subTitle" sx={{ color: 'text', mb: 3 }}>
        {authUser.email}
      </Text>
      <Divider sx={{ color: 'text' }} />
      {AppBarItems.map((item, i) => {
        return (
          <Flex
            key={i}
            sx={{ py: 2, alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onSelect(item.href)}
          >
            {item.icon}
            <Text variant="title" sx={{ color: 'text' }} ml={2}>
              {item.label}
            </Text>
          </Flex>
        );
      })}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button variant="secondary" onClick={logout}>
          Ausloggen
        </Button>
      </Box>
    </Box>
  ) : null;
};
export default DropdownMenu;