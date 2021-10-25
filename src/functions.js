import moment from 'moment'

// I didn't have time to dig into the floating decimal inaccuracy problem so just copy pasted this here and hoped it works
export const round = (num, places) => {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + places) + "e-" + places);
  } else {
    let arr = ("" + num).split("e");
    let sig = ""
    if (+arr[1] + places > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
  }
}

export const checkIfNum = (string) => {
  return !isNaN(string)
}

export const checkIfDateIsValid = (string) => {
  return moment(string, moment.ISO_8601, true).isValid();
}

export const validateDataPoint = (dataPoint) => {
  const hasAllProperties = 
    'user_id' in dataPoint &&
    'amount' in dataPoint &&
    'currency' in dataPoint &&
    'timestamp' in dataPoint
  const amountIsNum = checkIfNum(dataPoint.amount);
  const timestampIsValid = checkIfDateIsValid(dataPoint.timestamp)
  return amountIsNum && hasAllProperties && timestampIsValid
}

export const sortDataByUser = (data) => {
  let errors = [];
  const sortedData = data.reduce((dataObject, dataPoint, index) => {
    // do not include broken data
    if (!validateDataPoint(dataPoint)) {
      errors.push({message: `data point at the index of ${index} is invalid`});
      return dataObject
    };
    if(!dataObject[dataPoint.user_id]) {
      dataObject[dataPoint.user_id] = [];
    }
    dataObject[dataPoint.user_id].push(dataPoint);
    return dataObject
  }, {})
  return {data: sortedData, errors}
}



const calculateBalance= (data, currency) => {
return data.reduce((totEur, dataPoint) => {
    const isNum = checkIfNum(dataPoint.amount);
    if (dataPoint.currency === currency && isNum) {
    return totEur += Number(dataPoint.amount)
    }
    return totEur
}, 0);
}

const findLastActivity = (data) => {
    //sort data by dates
    const sortedData = data.sort((a,b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    // set first in sortedData as lastActivity
    return sortedData[0].timestamp
}

export const generateRow = (data) => {
    const row = {
        'User ID': data[0].user_id,
        'GBP': calculateBalance(data, 'GBP'),
        'USD': calculateBalance(data, 'USD'),
        'EUR': calculateBalance(data, 'EUR'),
        'Last Activity': findLastActivity(data)
    }
    return row;
}

// broken data for testing data validation and errors

const brokenData = [
  {
    "user_id": "b4521412-2eeb-43f3-a50d-be976b23189d",
    "timestamp": "2020-05-29T16:59:39Z",
    "currency": "GBP",
    "amount": "-886.69"
  },
  {
    "user_id": "9e92a331-81be-44b2-bf45-1fec891ebe42",
    "timestamp": "2019-12-05T18:28:13Z",
    "currency": "EUR",
    "amount": "-853.62"
  },
  {
    "user_id": "4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8",
    "timestamp": "2020-06-10T17:14:25Z",
    "currency": "GBP",
    "amount": "-81.71"
  },
  {
    "user_id": "ec28d8b8-1320-4e35-88ef-700c3eec750a",
    "timestamp": "2019-10-03T03:42:25Z",
    "currency": "GBP",
    "amount": "+690.67"
  },
  {
    "user_id": "32138630-53c5-40df-973d-497b306f0576",
    "timestamp": "2020-06-28T19:01:45Z",
    "currency": "USD",
    "amount": "-618.50"
  },
  {
    "user_id": "6f6c005c-bb46-47d3-b560-800a67798e70",
    "timestamp": "2020-06-21T16:37:05Z",
    "currency": "EUR",
    "amount": "+380.19"
  },
  {
    "user_id": "58b906e2-df1e-4b1c-a9c5-eced03801299",
    "timestamp": "2019-11-19T16:49:22Z",
    "currency": "EUR"
  },
  {
    "user_id": "febdf476-bee6-4337-8347-3b2e501425c6",
    "timestamp": "2019-09-14T23:13:41Z",
    "currency": "EUR",
    "amount": "-767.01"
  },
  {
    "user_id": "308020fa-2074-4ac5-afa6-d514b35c5962",
    "timestamp": "2019-11-19T08:42:09Z",
    "currency": "GBP",
    "amount": "-538.02"
  },
  {
    "user_id": "58b906e2-df1e-4b1c-a9c5-eced03801299",
    "timestamp": "2020-03-14T18:40:29Z",
    "currency": "GBP",
    "amount": "-751.10"
  }
]