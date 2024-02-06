import { d as defineEventHandler, r as readBody } from './nitro/node-server.mjs';
import { question, answers } from './question.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'mongodb';

const answer = defineEventHandler(async (event) => {
  const answer = await readBody(event);
  console.log(answer);
  if (answer == question["option1"]) {
    answers["op1"] = answers["op1"] + 1;
  } else if (answer == question["option2"]) {
    answers["op2"] = answers["op2"] + 1;
  } else {
    return { ok: false };
  }
  console.log(answers["op1"] + " " + answers["op2"]);
  return { ok: true };
});

export { answer as default };
//# sourceMappingURL=answer.mjs.map
