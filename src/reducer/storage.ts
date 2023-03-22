import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

//action type 선언
const SET_INFO = 'storage/SET_INFO' as const;

// type props 정의
export type InfoProps = {
  email: string;
  nickname: string;
};

//action 생성 함수 선언
export const setInfo = (diff: InfoProps) => ({
  type: SET_INFO,
  payload: diff,
});
// storage생성
export const persistConfig = {
  key: 'root',
  storage,
};

//action 객체 타입 준비
type InfoAction = ReturnType<typeof setInfo>;

//상태 타입과 상태 초기값 선언
type InfoState = {
  data: InfoProps | null;
};

const initialState: InfoState = {
  data: null,
};

//리듀서
const info = (state: InfoState = initialState, action: InfoAction) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const persistedReducer = persistReducer(persistConfig, info);
