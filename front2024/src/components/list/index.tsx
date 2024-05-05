import {memo, FC} from "react"
import './style.css'

interface IListProps {
  list: {
    _id: string | number
  }[];
  renderItem: (item: { _id: string | number }) => React.ReactNode
}

const List: FC<IListProps> = ({ list, renderItem }) => {
  return (
    <>
      {
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
    </>
  )
}

export default memo(List)
