import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/statistics/statActions";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;
const Home = () => {

  const dispatch = useDispatch();

  const data = useSelector((state) => state.stat.stats);
  const stats = data?.data?.stats;
 const total = millify(stats?.total);
const totalExchanges = millify(stats?.totalExchanges);
const totalVol= millify(stats?.total24hVolume);
const totalMarketCap= millify(stats?.totalMarketCap);
const totalMarkets = millify(stats?.totalMarkets);
  const loading = useSelector((state) => state.stat.loading);
  

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  if (loading) return <Loader/>;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets Cap" value={totalMarketCap} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={totalVol} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={totalMarkets} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">show more</Link>
        </Title>
      </div>
      <Cryptocurrencies limit="10" />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">show more</Link>
        </Title>
      </div>
      <News limit="6" />
    </>
  );
};

export default Home;
