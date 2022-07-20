import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPriceCoin } from "../api";

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  background-color: ${(props) => props.theme.infoBoxColor};
  border-radius: 10px;
  div {
    padding: 10px;
  }
`;

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IPrice>(["priceChange", coinId], () =>
    fetchPriceCoin(coinId)
  );
  return (
    <>
      {isLoading ? (
        "로딩 중.."
      ) : (
        <PriceContainer>
          <div>15분 전 : {data?.quotes.USD.percent_change_15m}%</div>
          <div>30분 전 : {data?.quotes.USD.percent_change_30m}%</div>
          <div>1시간 전 : {data?.quotes.USD.percent_change_1h}%</div>
          <div>6시간 전 : {data?.quotes.USD.percent_change_6h}%</div>
          <div>12시간 전 : {data?.quotes.USD.percent_change_12h}%</div>
          <div>24시간 전 : {data?.quotes.USD.percent_change_24h}%</div>
          <div>7일 전 : {data?.quotes.USD.percent_change_7d}%</div>
          <div>30일 전 : {data?.quotes.USD.percent_change_30d}%</div>
          <div>1년 전 : {data?.quotes.USD.percent_change_1y}%</div>
        </PriceContainer>
      )}
    </>
  );
}

export default Price;
