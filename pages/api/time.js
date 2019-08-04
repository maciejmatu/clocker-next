import "isomorphic-unfetch";
import Cors from "micro-cors";

const cors = Cors({
  allowedMethods: ["GET", "HEAD"]
});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

async function Endpoint(req, res) {
  const { delay, location } = req.query;

  await sleep(delay);
  const data = await fetch(
    `https://worldtimeapi.org/api/timezone/${location}`
  ).then(res => res.json());

  res.json(data);
}

export default cors(Endpoint);
