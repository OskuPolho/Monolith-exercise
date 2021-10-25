import { useEffect, useState, useContext } from "react"
import {generateRow} from '../functions'
import Column from './Column'
import { columnsContext } from '../App'

const TableRow = ({userData}) => {
  const [row, setRow] = useState(null);
  const columns = useContext(columnsContext);
  
  useEffect(() => { 
    setRow(generateRow(userData));
  }, [userData]);

  if (!row) return null
  return <tr>
    {columns.map(col => <Column key={`key-td${col}`} value={row[col]} field={col}/>)}
  </tr>
}

export default TableRow