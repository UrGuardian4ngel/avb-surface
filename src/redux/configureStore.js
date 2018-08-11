import { createStore, combineReducers, Store } from 'redux';
import avbReducer from './modules/avb/reducers';
import type { AVBState } from './modules/avb/reducers';

type State = {
  avb: AVBState,
}

const rootReducer = combineReducers({
  avb: avbReducer,
});

const configureStore = (initialState: State): Store<State> => createStore(rootReducer, initialState);

export default configureStore;
