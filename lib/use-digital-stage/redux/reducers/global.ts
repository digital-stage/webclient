import {
  ServerDeviceEvents,
  ServerGlobalEvents,
  ServerUserEvents,
} from '../../global/SocketEvents';
import { GlobalStore } from '../../types';

function global(
  state: GlobalStore = {
    ready: false,
    stageId: undefined,
    localDeviceId: undefined,
    groupId: undefined,
  },
  action: {
    type: string;
    payload: any;
  }
): GlobalStore {
  switch (action.type) {
    case ServerGlobalEvents.READY:
      return {
        ...state,
        ready: true,
      };
    case ServerGlobalEvents.STAGE_JOINED: {
      const { stageId, groupId } = action.payload as {
        stageId: string;
        groupId: string;
      };
      return {
        ...state,
        stageId,
        groupId,
      };
    }
    case ServerGlobalEvents.STAGE_LEFT:
      return {
        ...state,
        stageId: undefined,
        groupId: undefined,
      };
    case ServerUserEvents.USER_READY:
      return {
        ...state,
        userId: action.payload._id,
      };
    case ServerDeviceEvents.LOCAL_DEVICE_READY:
      return {
        ...state,
        localDeviceId: action.payload._id,
      };
    default:
      return state;
  }
}

export default global;