import {memo, useCallback, useMemo} from "react"
import useTranslate from "@src/hooks/use-translate"
import useStore from "@src/hooks/use-store"
import useSelector from "@src/hooks/use-selector"
import Select from "@src/components/select"
import Input from "@src/components/input"
import SideLayout from "@src/components/side-layout"
import treeToList from "@src/utils/tree-to-list"
import listToTree from "@src/utils/list-to-tree"
import { StoreState } from "@src/store/types"

function CatalogFilterForModal() {

  const store = useStore();

  const select = useSelector((state: StoreState) => ({
    sort: state.catalog_modal.params.sort,
    query: state.catalog_modal.params.query,
    category: state.catalog_modal.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort: string | number) => store.actions.catalog_modal.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback((query: string) => store.actions.catalog_modal.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog_modal.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback((category: string | number) => store.actions.catalog_modal.setParams({category, page: 1}), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => ([
      {value: '', title: 'Все'},
      ...treeToList(listToTree(select.categories), (item: {_id: string, title: string}, level: number) => (
        {value: item._id, title: '- '.repeat(level) + item.title}
      ))
    ]), [select.categories]),
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilterForModal);
