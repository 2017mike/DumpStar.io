import React from 'react'
import { useQuery } from "react-query";

const API = () => {
  const fetchQuote = () => { fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  }

  const {data, status} = useQuery('quotes', fetchQuote)
  console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default API
