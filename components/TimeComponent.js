import "isomorphic-unfetch";
import React from "react";

export function TimeDisplayComponent({
  location = "Europe/Berlin",
  isLoading = false,
  datetime
}) {
  if (!isLoading && datetime) {
    console.log(datetime);
    const date = datetime.slice(0, 10);
    const time = datetime.slice(11, 19);
    const millisecondsAndTimeZone = datetime.slice(20, 29);

    return (
      <p>
        The time in <strong>{location}</strong> is {date},{" "}
        <strong>{time}</strong>, {millisecondsAndTimeZone}
      </p>
    );
  }

  return <p>Loading {location} time...</p>;
}

export function TimeComponent({ delay = 100, location = "Europe/Berlin" }) {
  const [{ datetime }, setTimeData] = React.useState({});
  const [isLoadingTime, setLoadingTime] = React.useState(false);

  React.useEffect(() => {
    setLoadingTime(true);

    fetchTime(delay, location).then(data => {
      setLoadingTime(false);
      setTimeData(data);
    });
  }, [delay, location]);

  return (
    <TimeDisplayComponent
      location={location}
      isLoading={isLoadingTime}
      datetime={datetime}
    />
  );
}

export async function fetchTime(delay, location) {
  return fetch(
    `${
      process.env.absoluteUrl
    }/api/time?delay=${delay}&location=${encodeURIComponent(location)}`
  ).then(res => res.json());
}
