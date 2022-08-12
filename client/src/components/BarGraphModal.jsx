import { useDispatch } from "react-redux";
import { showStatisticsModal } from "../reducers/modalSlice";
import ApexCharts from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Background,
  Container,
  Title,
  ChartField,
  Chart,
  AgeField,
  NoData,
} from "./BarGraphModalStyled";

//TODO: 통계 그래프 모달 완성하기
export default function BarGraphModal({ voteCount, statistic }) {
  const dispatch = useDispatch();
  const male = statistic.male;
  const female = statistic.female;

  return (
    <Background onClick={() => dispatch(showStatisticsModal(false))}>
      <Container onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon
          onClick={() => dispatch(showStatisticsModal(false))}
          icon={faXmark}
          size={"2x"}
        ></FontAwesomeIcon>
        {voteCount > 30 ? (
          <>
            <Title>연령별 투표 결과</Title>
            <ChartField>
              <Chart>
                <ApexCharts
                  type={"bar"}
                  series={[
                    {
                      name: "반대",
                      data: [
                        male["10"].disagrees,
                        male["20"].disagrees,
                        male["30"].disagrees,
                        male["40"].disagrees,
                        male["50"].disagrees,
                        male["60"].disagrees,
                      ],
                      color: "#A5A5A5",
                    },
                    {
                      name: "찬성",
                      data: [
                        male["10"].agrees,
                        male["20"].agrees,
                        male["30"].agrees,
                        male["40"].agrees,
                        male["50"].agrees,
                        male["60"].agrees,
                      ],
                      color: "#FB7777",
                    },
                  ]}
                  options={{
                    chart: {
                      stacked: true,
                      stackType: "100%",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        barHeight: "70%",
                      },
                    },
                    title: {
                      text: "남성",
                      align: "center",
                      style: {
                        fontSize: "20px",
                      },
                    },
                    xaxis: {
                      categories: [
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                        "60대이상",
                      ],
                    },
                    yaxis: {
                      show: false,
                    },
                  }}
                ></ApexCharts>
              </Chart>
              <AgeField>
                <div>10대</div>
                <div>20대</div>
                <div>30대</div>
                <div>40대</div>
                <div>50대</div>
                <div>60대 이상</div>
              </AgeField>
              <Chart>
                <ApexCharts
                  type={"bar"}
                  series={[
                    {
                      name: "찬성",
                      data: [
                        female["10"].agrees,
                        female["20"].agrees,
                        female["30"].agrees,
                        female["40"].agrees,
                        female["50"].agrees,
                        female["60"].agrees,
                      ],
                      color: "#FB7777",
                    },
                    {
                      name: "반대",
                      data: [
                        female["10"].disagrees,
                        female["20"].disagrees,
                        female["30"].disagrees,
                        female["40"].disagrees,
                        female["50"].disagrees,
                        female["60"].disagrees,
                      ],
                      color: "#A5A5A5",
                    },
                  ]}
                  options={{
                    chart: {
                      height: "300px",
                      stacked: true,
                      stackType: "100%",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        barHeight: "70%",
                      },
                    },
                    title: {
                      text: "여성",
                      align: "center",
                      style: {
                        fontSize: "20px",
                      },
                    },
                    xaxis: {
                      categories: [
                        "10대",
                        "20대",
                        "30대",
                        "40대",
                        "50대",
                        "60대이상",
                      ],
                    },
                    yaxis: {
                      show: false,
                    },
                  }}
                ></ApexCharts>
              </Chart>
            </ChartField>
          </>
        ) : (
          <NoData>
            <div>통계를 위한 투표수가 부족합니다.</div>
            <div>투표에 참여해보세요!</div>
            <img src={"/images/vote.png"} alt={"투표마크"}></img>
          </NoData>
        )}
      </Container>
    </Background>
  );
}
