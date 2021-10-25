import { useEffect, useState } from "react"
import { round } from '../functions'

const NumberColumn = ({value}) => {
  const [className, setClassName] = useState('');
  const [prefix, setPrefix] = useState('');
  useEffect(() => {
      if (value < 0) {
        setClassName('negative')
      } else {
        setPrefix('+');
        setClassName('positive')
      }
  }, [value]);
  if (value === 0) return <td>-</td>
  return <td className={className}>{`${prefix}${round(value, 2)}`}</td>
}

export default NumberColumn