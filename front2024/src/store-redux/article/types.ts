export interface IProduct {
  category: {
    title: string
    _id: string
  }
  description: string
  madeIn: {
    title: string
    code: string
    _id: string
  }
  name: string
  order: number
  price: number
  title: string
  _id: string
  _key: string
  _type: string
}

export interface IActionTypeStart {
  type: 'article/load-start'
  payload?: {}
}

export interface IActionTypeSuccess {
  type: 'article/load-success'
  payload?: { data: IProduct }
}

export interface IActionTypeAllSuccess {
  type: 'article/load-all-success'
  payload?: { data: IProduct[] }
}

export interface IActionTypeError {
  type: 'article/load-error'
  payload?: {}
}

export type TAction =
  | IActionTypeStart
  | IActionTypeSuccess
  | IActionTypeAllSuccess
  | IActionTypeError

export interface IAction {
  type: string
  payload?: { data: IProduct | IProduct[] }
}

export interface IResponseProduct {
  data: {
    result: IProduct
  }
  headers: any
  status: number
}
