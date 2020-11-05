import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';
import { useAuth } from '../lib/digitalstage/useAuth';
import Loading from '../components/new/elements/Loading';
import Login from './account/login';
import StageListView from '../components/new/elements/StageList';
import useStageSelector from '../lib/digitalstage/useStageSelector';
import Container from '../components/new/elements/Container';

const Stages2 = () => {
  const router = useRouter();
  const { loading, user } = useAuth();
  const stageId = useStageSelector<string | undefined>((state) => state.stageId);
  const [initialized, setInitialized] = useState<boolean>();

  useEffect(() => {
    if (initialized) {
      if (stageId) {
        router.push('/');
      }
    }
  }, [stageId]);

  useEffect(() => {
    if (router.pathname === '/stages') {
      setInitialized(true);
    }
  }, [router.pathname]);

  if (!loading) {
    if (!user) {
      return <Login />;
    }
    return (
      <Container>
        <Typography variant="h1">Meine Bühnen</Typography>
        <StageListView />
      </Container>
    );
  }

  return (
    <Loading>
      <Typography variant="h1">Lade ...</Typography>
    </Loading>
  );
};
export default Stages2;
