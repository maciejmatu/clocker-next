import "isomorphic-unfetch";
import React from "react";
import {
  TimeComponent,
  TimeDisplayComponent,
  fetchTime
} from "../components/TimeComponent";
import Head from "next/head";
import "../styles/index.css";

export default function IndexPage({ timezones }) {
  return (
    <div className="App">
      <Head>
        <meta
          name="google-site-verification"
          content="lpeIiRCuiBhXLNtHGOGsZc45A-ZGTnxYC-9dsnDMnds"
        />
      </Head>
      <header className="App-header">
        {timezones.map(({ timezone, datetime }) => (
          <TimeDisplayComponent
            key={timezone}
            location={timezone}
            datetime={datetime}
          />
        ))}
        <TimeComponent delay={2000} location="Pacific/Palau" />
        <TimeComponent delay={5000} location="America/New_York" />
        <TimeComponent delay={9000} location="Australia/Melbourne" />
      </header>
    </div>
  );
}

IndexPage.getInitialProps = async () => {
  const timezones = await Promise.all([
    fetchTime(100, "Europe/Berlin"),
    fetchTime(500, "Europe/Lisbon"),
    fetchTime(1000, "Asia/Brunei"),
    fetchTime(3000, "Asia/Tokyo")
  ]);

  return {
    timezones
  };
};
