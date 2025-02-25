import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DATABASE)

const database = client.db('WYR')
const questions =  database.collection<q>('Questions')
const instance =  database.collection<a>('Instance')

let question;
let answers;


async function bruv(){
    const v = await questions.aggregate([ { $sample: { size: 1 } } ]).toArray()
    let obj =  v[0]
    question = obj
    answers = {question:question["_id"],op1:0,op2:0,time:new Date().toLocaleString()}
}

bruv()

setInterval(()=>{
    console.log(question);
    if(answers["op1"] > 0 || answers["op2"] > 0){
        instance.insertOne(answers)
    }
    bruv();},60000)

export default defineEventHandler(() => {
    let obj = structuredClone(question);
    obj["op1"] = answers["op1"]
    obj["op2"] = answers["op2"]
    return obj;

})


export{question, answers}

interface q {
    question:string,
    option1:string,
    option2:string,
}
interface a {
    question:string,
    op1:number,
    op2:number,
}
