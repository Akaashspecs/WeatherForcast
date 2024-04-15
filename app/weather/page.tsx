import { Suspense } from "react";

import WeatherPage from "./WeatherPage";

const Weather = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WeatherPage />
    </Suspense>
  );
};

export default Weather;
