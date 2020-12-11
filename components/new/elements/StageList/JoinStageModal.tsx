import React from 'react';
import { Flex, Button, Heading, Text, Message } from 'theme-ui';
import Modal from '../Modal';
import InputField from '../../../InputField';
import { useRouter } from 'next/router';

const JoinStageModal = (props: { isOpen?: boolean; onClose?: () => void }): JSX.Element => {
  const { isOpen, onClose } = props;
  const router = useRouter();
  const [link, setLink] = React.useState<string>();
  const [msg, setMsg] = React.useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setMsg('');
  };

  // TODO: Misses error handling - I am not sure if the change is sufficient
  const joinStage = () => {
    if (link) {
      const port: string = window.location.port ? `:${window.location.port}` : '';
      const path: string = link.replace(
        `${window.location.protocol}/${window.location.hostname}${port}`,
        ''
      );
      router.push(path);
    } else {
      setMsg('Bitte gib einen Link ein!');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading variant="title">Bühne mit einem Link beitreten</Heading>
      <Text variant="subTitle">
        Gib den Link ein, mit welchem Du einer Bühne beitreten möchtest
      </Text>
      {msg && <Message variant="danger">{msg}</Message>}
      <InputField
        type="text"
        id="link"
        name="link"
        label="Link"
        onChange={onChange}
        value={link}
        version="dark"
      />
      <Flex sx={{ justifyContent: 'space-between', py: 2 }}>
        <Button
          variant="tertiary"
          sx={{ color: 'gray.5' }}
          onClick={() => {
            onClose();
            setMsg('');
          }}
        >
          Schließen
        </Button>
        <Button onClick={joinStage} autoFocus>
          Beitreten
        </Button>
      </Flex>
    </Modal>
  );
};

export default JoinStageModal;
