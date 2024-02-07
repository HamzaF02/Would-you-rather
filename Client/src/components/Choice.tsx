import Counter from "./Counter.tsx"
import { useMutation } from "@tanstack/react-query";
export default function Choice({color,answer,count,lock,lockIt}:any){

    const variants : {[index: string] : string} = {
        blue: "bg-blue-500 focus:bg-blue-400 border-blue-700 focus:border-blue-500",
        red: "bg-red-500 focus:bg-red-400 border-red-700 focus:border-red-500"
    }

    const {mutateAsync: sendAnswer} = useMutation({
        mutationFn: async () =>{
            const rep = await fetch('/api/answer', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answer),
            });
            const response = await rep.json();
            if(!response.ok){
                throw Error("Answer not given to server")
            }
        },
        onSuccess: () =>{
            lockIt()
        }
    })
    

    let but = (
        <button className={ "text-white font-bold py-2 px-4 border-b-4 "+variants[color]+" rounded w-11/12 font-serif text-xl"
    } 
        onClick={async()=>{
        try {
            await sendAnswer()
        } catch (error) {
            console.error(error)
        }
        }}>
            {answer}
        </button>)


    if(lock){
        but = (<div className={"text-white font-bold py-2 px-4 "+variants[color]+" rounded w-11/12 font-serif text-xl grid"
    }><p className="text-center m-auto">🔒{answer}</p></div>)
    }


    return(
        <div className='grid grid-cols-1 justify-items-center mb-10'>
          <Counter count={count}/>
          {but}
        </div>
    )
}