import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export interface StoreState {
  progressTime: number,
  restTime: number,
  loop: number,
}

export const initialState: StoreState = {
  progressTime: 5,
  restTime: 3,
  loop: 2,
}

export const setProgressTime = actionCreator<number>('SET_PROGRESS_TIME')
export const setRestTime = actionCreator<number>('SET_REST_TIME')
export const setLoop = actionCreator<number>('SET_LOOP')