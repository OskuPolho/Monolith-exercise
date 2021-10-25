import moment from 'moment'
import NumberColumn from "./NumberColumn"


const Column = ({value, field}) => {
  const isCurrency = field === 'GBP' || field === 'EUR' || field ==='USD';
  if (isCurrency) return <NumberColumn value={value}/>
  return <td className={field==='User ID' ? 'uid' : ''}>{`${field === 'Last Activity' ? moment(value).format('YYYY-MM-DD') : value}`}</td>
}

export default Column