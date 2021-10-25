import { useContext, useState } from "react"
import TableRow from '../Components/TableRow'
import {columnsContext} from '../App'

const Table = ({data}) => {
  const columns = useContext(columnsContext);
  const [dataLimit, setDataLimit] = useState(10)

  // divide table in batches to avoid rendering vast datasets
  const dataArray = Object.keys(data);
  const seeMore = dataLimit < dataArray.length
  const dividedArray = dataArray.splice(0, dataLimit);

  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            {columns.map(c => <th key={`key-th${c}`} className={c === 'User ID' ? 'uid' : ''}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {dividedArray.map((uid, i) => {
            return (
              <TableRow key={`key-${uid}`} index={i} id={uid} userData={data[uid]}/>
            )}
          )}
        </tbody>
      </table>
      {seeMore && <div className='more' onClick={() => setDataLimit(dataLimit + 10)}>See More</div>}
      {dataLimit > 10 && <div className='less' onClick={() => setDataLimit(dataLimit - 10)}>See Less</div>}
    </div>
  )
}

export default Table