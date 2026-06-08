import React, { useEffect, useState } from 'react'

export default function App() {
  const [Process_data, setProcess_data] = useState([])

  useEffect(() => {
    const getProcessData = async () => {

      const resp = await fetch("http://localhost:5000")
      if (!resp.ok) {
        alert("Failed to Fetch");
        return;
      }
      else {

        const data = await resp.json();
        setProcess_data(data.data);

      }

    }
    if (Process_data.length == 0) {

      getProcessData();

    }
  }, [Process_data])

  return (
    <div>
      {Process_data.length > 0 && Process_data.map((value, index) => (
        <div className='flex flex-col' key={index}>
          <div className='flex text-[12px] gap-[10px]'>
            <p>{value.pid}</p>
            <p>{value.name}</p>
          </div>

        </div>
      ))}
    </div>
  )
}
