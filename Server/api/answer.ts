import {answers, question} from "./question"

export default defineEventHandler(async (event) => {
    const answer = await readBody(event)
    console.log(answer)
    if(answer==question["option1"]){
        answers["op1"] = answers["op1"] + 1
    }else if(answer==question["option2"]){
        answers["op2"] = answers["op2"] + 1
    }
    else {return {ok: false}}
    console.log(answers["op1"] + " " + answers["op2"])
    return {ok:true}
}) 
