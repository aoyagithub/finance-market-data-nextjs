export async function getData(symbol, type, range) {
  let URL = "";
  let fullUrl = "";
  if (type === "chart") {
    if (range === "1d") {
      URL = "https://query2.finance.yahoo.com/v8/finance/chart/";
      fullUrl = URL + symbol;
    } else if (range === "5d") {
      URL = "https://query2.finance.yahoo.com/v8/finance/chart/";
      fullUrl = `${URL}${symbol}?range=5d`;
    }
  }
  if (type === "quote") {
    URL = "https://query1.finance.yahoo.com/v6/finance/quote?symbols=";
    fullUrl = URL + symbol;
  }
  const result = await (await fetch(fullUrl)).json();

  if (type === "chart") {
    if (result.chart.error) return result;
  }
  if (type === "quote") {
    if (result.quoteResponse.error) return result;
  }
  return result;
}
