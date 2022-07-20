import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin: 40px 0px;
`;

const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: black;
  width: 400px;
  margin: 0 auto 10px auto;
  border-radius: 10px;
  a {
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 18px;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
    transition: color 0.3s ease-in-out;
    img {
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const ToggleBtn = styled.button`
  margin-top: 30px;
  border: none;
  background-color: ${(props) => props.theme.toggleBtnColor};
  color: ${(props) => props.theme.toggletextColor};
  cursor: pointer;
  padding: 5px 20px;
  font-size: 16px;
  border-radius: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  const setModeFn = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const onClick = () => setModeFn((current) => !current);

  return (
    <Container>
      <Helmet>
        <title>코인목록</title>
      </Helmet>
      <Header>
        <Title>코인 목록</Title>
        <ToggleBtn onClick={onClick}>
          {isDark ? "라이트 모드" : "다크 모드"}
        </ToggleBtn>
      </Header>
      {isLoading ? (
        "로딩 중.."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ coinName: coin.name }}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
