import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchChartCoin } from "../api";
import ApexChart from "react-apexcharts";
import { isPropertySignature } from "typescript";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ICoinHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IToggleMode {}

function Chart({}: IToggleMode) {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["history", coinId],
    () => fetchChartCoin(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "차트 로딩 중..."
      ) : (
        <ApexChart
          type="line"
          options={{
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
              background: isDark ? "#3F4E4F" : "#DCD7C9",
            },
            theme: { mode: "dark" },
            stroke: { curve: "smooth" },
            yaxis: { show: false },
            xaxis: {
              categories: data?.map((price) => price.time_close),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
          series={[
            {
              name: "종가",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
        />
      )}
    </div>
  );
}

export default Chart;
