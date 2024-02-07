// import { useState } from 'react'
import Choice from './components/Choice'

import './App.css'
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';


function App() {
  const queryClient = useQueryClient()
  const {data: question, isLoading}= useQuery({
    queryKey:["question"],
    queryFn: async()=>{
      const response = await fetch("https://wyrserver.onrender.com/api/question");
      const rep = await response.json() as q;
      const past = queryClient.getQueryData(["question"]) as q
      if(past && rep.question != past?.question){
        setLock(false)
        console.log(past.question)
      }
      return rep;

      
    },
    refetchInterval: 500
    
  })
  const [lock, setLock] = useState(false)


  function lockIt(){
    setLock(true)
  }

  if(isLoading){
    return(<div><p>loading</p></div>)
  }

  return (
    <div className='grid grid-cols-1 w-screen h-screen justify-items-center items-center'>
      <h1 className='uppercase md:text-3xl lg:text-4xl content-center p-10 text-center'>{question?.question}</h1>

      <div className='grid grid-cols-2 w-full h-full'>  
          <Choice color="blue" answer={question?.option1} count={question?.op1} lock={lock} lockIt={lockIt}/>
          <Choice color="red" answer={question?.option2} count={question?.op2} lock={lock} lockIt={lockIt}/>
      </div>

    </div>
  )
}

export default App

interface q {
  question:string
  ,option1:string,
  option2:string,
  op1:Number,
  op2:Number
}