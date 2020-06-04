export interface BaseReducerState {
  user: {
    userId: number
  }
}

export interface ReduxState {
  base: BaseReducerState
}

const initialReduxState: ReduxState = {
  base: {
    user: {
      userId: 1
    }
  }
}

export default initialReduxState