import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useWeddingBoundStore } from '../weddings';
// import { customSessionStorage } from '../storages/session.storage';
// import { firebaseStorage } from '../storages/firebase.storage';
// import { logger } from '../middlewares/logger.middleware';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName' ),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName' ),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeApi,
      {
        name: 'person-storage',
        // storage: customSessionStorage
        // storage: firebaseStorage
      }
    )
  )
);

usePersonStore.subscribe(( nextState, /* prevState */ ) => {

  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName( firstName );
  useWeddingBoundStore.getState().setLastName( lastName );

});