export async function fetchCoins() {
  return await fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}

export async function fetchInfoCoin(coinId: string | undefined) {
  return await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
    (response) => response.json()
  );
}

export async function fetchPriceCoin(coinId: string | undefined) {
  return await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(
    (response) => response.json()
  );
}

export async function fetchChartCoin(coinId: string | undefined) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23;
  return await fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
