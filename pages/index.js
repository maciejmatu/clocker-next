import "isomorphic-unfetch";
import React from "react";
import {
  TimeComponent,
  TimeDisplayComponent,
  fetchTime
} from "../components/TimeComponent";
import "../styles/index.css";

export default function IndexPage({ timezones }) {
  return (
    <div className="App">
      <header className="App-header">
        {timezones.map(({ timezone, datetime }) => (
          <TimeDisplayComponent
            key={timezone}
            location={timezone}
            datetime={datetime}
          />
        ))}
        <TimeComponent delay={2000} location="Pacific/Palau" />
        <TimeComponent delay={7000} location="America/New_York" />
        <TimeComponent delay={17000} location="Australia/Melbourne" />
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
