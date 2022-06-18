import { getData } from "../../lib/dataFetcher";

export default async function Get(req, res) {
  const data = await getData(req.query.symbol, req.query.type, req.query.range);
  res.status(200).json(data);
}
