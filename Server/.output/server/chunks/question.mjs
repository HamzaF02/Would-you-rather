import { d as defineEventHandler } from './nitro/node-server.mjs';
import { MongoClient } from 'mongodb';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const client = new MongoClient("mongodb+srv://Panb:8ipQ4wZNRr6PR8Cw@cluster0.k2v22js.mongodb.net/");
const database = client.db("WYR");
const questions = database.collection("Questions");
const instance = database.collection("Instance");
let question;
let answers;
async function bruv() {
  const v = await questions.aggregate([{ $sample: { size: 1 } }]).toArray();
  let obj = v[0];
  question = obj;
  answers = { question: question["_id"], op1: 0, op2: 0 };
}
bruv();
setInterval(() => {
  console.log(question);
  instance.insertOne(answers);
  bruv();
}, 2e4);
const question$1 = defineEventHandler(() => {
  let obj = structuredClone(question);
  obj["op1"] = answers["op1"];
  obj["op2"] = answers["op2"];
  return obj;
});

export { answers, question$1 as default, question };
//# sourceMappingURL=question.mjs.map
