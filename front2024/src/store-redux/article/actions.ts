import Services from '@src/services'
import { IResponseProduct, TAction } from './types'
import { Dispatch } from 'react'

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id: string) => {
    return async (dispatch: Dispatch<TAction>, getState: any, services: Services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' })
      try {
        const res: IResponseProduct = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        })
        // Товар загружен успешно
        dispatch({
          type: 'article/load-success',
          payload: { data: res.data.result as any },
        })
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' })
      }
    }
  },

  loadAll: (items: string[]) => {
    console.log('items', items)
    return async (dispatch: Dispatch<TAction>, getState: any, services: Services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' })

      // Создаем массив для хранения результатов запросов
      const dataArray = []

      // Проходим по массиву items
      for (const item of items) {
        try {
          // Делаем запрос для каждого элемента массива
          const res: IResponseProduct = await services.api.request({
            url: `/api/v1/articles/${item}?fields=*,madeIn(title,code),category(title)`,
          })

          // Сохраняем результат запроса в переменную data и добавляем в массив
          const data = res.data.result
          dataArray.push(data)
        } catch (error) {
          console.error(`Ошибка при запросе для элемента ${item}:`, error)
        }
      }
      dispatch({
        type: 'article/load-all-success',
        payload: { data: dataArray },
      })
    }
  },
}
