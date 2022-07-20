import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchInfoCoin, fetchPriceCoin } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loading = styled.span``;

const InfoContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`;
const InfoBox = styled.div`
  height: 40px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.infoBoxColor};
  border-radius: 10px;
  font-size: 16px;
`;
const Description = styled.div`
  margin: 50px 0px;
  font-size: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0 40px 0;
`;
const Btn = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.infoBoxColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  border: none;
  width: 200px;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
`;
const Home = styled.div`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.theme.infoBoxColor};
  margin: 0 auto;
  border-radius: 10px;
  margin-bottom: 10px;
  a {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    font-size: 14px;
  }
`;

interface IState {
  state: { coinName: string };
}
interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
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

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as IState;
  const chartMatch = useMatch("/:coinId/chart");
  const pricetMatch = useMatch("/:coinId/price");

  const { isLoading: InfoLoading, data: InfoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchInfoCoin(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPrice>(
    ["price", coinId],
    () => fetchPriceCoin(coinId),
    {
      refetchInterval: 5000,
    }
  );

  // const [info, setInfo] = useState<IInfo>();
  // const [price, setPrice] = useState<IPrice>();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.coinName
            ? state.coinName
            : InfoLoading
            ? "로딩 중..."
            : InfoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.coinName
            ? state.coinName
            : InfoLoading
            ? "로딩 중..."
            : InfoData?.name}
        </Title>
      </Header>
      <Home>
        <Link to="/">코인목록</Link>
      </Home>
      {InfoLoading || priceLoading ? (
        <Loading>로딩 중..</Loading>
      ) : (
        <InfoContainer>
          <InfoBox>
            <span>순위 : {InfoData?.rank}</span>
            <span>Symbol : {InfoData?.symbol}</span>
            <span>가격 : $ {priceData?.quotes.USD.price.toFixed(2)}</span>
          </InfoBox>
          <Description>
            <p>{InfoData?.description}</p>
          </Description>
          <InfoBox>
            <span>Total Suply : {priceData?.total_supply}</span>
            <span>Max Suply : {priceData?.max_supply} </span>
          </InfoBox>
          <BtnContainer>
            <Link to="price">
              <Btn isActive={pricetMatch !== null}>변동률</Btn>
            </Link>
            <Link to="chart">
              <Btn isActive={chartMatch !== null}>차트</Btn>
            </Link>
          </BtnContainer>
          <Outlet />
        </InfoContainer>
      )}
    </Container>
  );
}

export default Coin;
