import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { initialState, setProgressTime, setRestTime, setLoop } from './action'

export default reducerWithInitialState(initialState)
    .case(setProgressTime, (state, progressTime) => ({ ...state, progressTime }))
    .case(setRestTime, (state, restTime) => ({ ...state, restTime }))
    .case(setLoop, (state, loop) => ({ ...state, loop }))
    .build()