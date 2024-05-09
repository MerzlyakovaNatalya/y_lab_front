import { IProduct, IAction, TAction } from './types'

interface IInitialState {
  data: IProduct | {}
  all: IProduct[]
  waiting: boolean
}

// Начальное состояние
export const initialState: IInitialState = {
  data: {},
  all: [],
  waiting: false, // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action: TAction): IInitialState {
  switch (action.type) {
    case 'article/load-start':
      return { ...state, data: {}, waiting: true }

    case 'article/load-success':
      return { ...state, data: action.payload!.data, waiting: false }

    case 'article/load-all-success':
      return { ...state, all: action.payload!.data, waiting: false }

    case 'article/load-error':
      return { ...state, data: {}, waiting: false } //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state
  }
}

export default reducer
