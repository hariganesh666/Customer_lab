

import React, { useState } from 'react'
import Popup from './components/popup/Popup'

function App() {
  const [datas, setDatas] = useState([
        {id:1, label: 'First Name', value: 'first_name' },
        {id:2, label: 'Last Name', value: 'last_name' },
        {id:3, label: 'Gender', value: 'gender' },
        {id:4, label: 'Age', value: 'age' },
        {id:5, label: 'Account Name', value: 'account_name' },
        {id:6, label: 'City', value: 'city' },
        {id:7, label: 'State', value: 'state' }
      ]);
  return (
    <div >
      <Popup datas={datas} setDatas={setDatas}/>
    </div>
  )
}

export default App