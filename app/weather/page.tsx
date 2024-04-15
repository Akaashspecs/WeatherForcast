"use client";
import { useEffect } from "react";
import { useStore } from "../models/RootStore";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const weather = () => {
  const rootStore = useStore();

  const searchParams = useSearchParams();

  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");

  useEffect(() => {
    if (rootStore && longitude && latitude) {
      rootStore.fetchWeather({ latitude: +latitude, longitude: +longitude });
    }
  }, [rootStore, latitude, longitude]);

  console.log(rootStore.weather.cnt);

  return (
    <div className="h-full w-full  flex flex-col">
      <div className="flex items-center shadow-black shadow-2xl py-2 px-5 rounded-2xl">
        <div className="text-white text-3xl font-semibold">Wehather App</div>
        <img src="/weather-logos.png" className="h-16" />
      </div>

      <div className="h-full mt-5 shadow-black shadow-2xl overflow-hidden w-full flex p-3">
        <div className="">
          {" "}
          <div className="text-white text-2xl text-center font-semibold">
            My Location
          </div>
          <DynamicMap lat={+latitude!} lon={+longitude!} />
        </div>
      </div>
    </div>
  );
};

export default weather;
