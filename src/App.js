import axios from "axios"
import { useEffect, useState, createContext } from "react"
import {sortDataByUser} from './functions'
import Table from './Components/Table'

export const columnsContext = createContext();

function App () {
  const [data, setData] = useState(null); 
  const [errors, setErrors] = useState([])
  const fetchData = async() => {
    const tLg = await axios.get('http://localhost:3000/transactions-large.json');
    // sort data by user
    const sortedData = sortDataByUser(tLg.data);

    // Use "brokenData" instead try out the data validation and error handling
    // const sortedData = sortDataByUser(brokenData);

    setErrors(sortedData.errors)
    setData(sortedData.data); 
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div className={'loading'}>Loading</div>
  if (errors.length > 0) return <Errors errors={errors} />
  return (
    <columnsContext.Provider value={[
      'User ID',
      'GBP',
      'USD',
      'EUR',
      'Last Activity'
    ]}>
      <Table data={data}/>
    </columnsContext.Provider>
  )
}

export default App

const Errors = ({errors}) => {
  return <div>
    {errors.map(err => <div>{err.message}</div>)}
  </div>
}