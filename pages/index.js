import "isomorphic-unfetch";
import React from "react";
import {
  TimeComponent,
  TimeDisplayComponent,
  fetchTime
} from "../components/TimeComponent";
import Head from "next/head";
import { setupErrorLogger } from "../components/setupErrorLogger";
import "../styles/index.css";

setupErrorLogger();

export default function IndexPage({ timezones }) {
  return (
    <div className="App">
      <Head>
        <meta
          name="google-site-verification"
          content="lpeIiRCuiBhXLNtHGOGsZc45A-ZGTnxYC-9dsnDMnds"
        />
        <meta name="msvalidate.01" content="7B6AA9F5A8F1938FDBC8F0BED0790FB1" />
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
    // fail silently on backend errors
    fetchTime(100, "Europe/Berlin").catch(() => ({})),
    fetchTime(500, "Europe/Lisbon").catch(() => ({})),
    fetchTime(1000, "Asia/Brunei").catch(() => ({})),
    fetchTime(3000, "Asia/Tokyo").catch(() => ({}))
  ]);

  return {
    timezones
  };
};
