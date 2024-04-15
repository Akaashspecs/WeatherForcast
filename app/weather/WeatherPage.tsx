"use client";
import { useEffect, useState } from "react";
import { useStore } from "../models/RootStore";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "next/navigation";
const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const WeatherPage = observer(() => {
  const rootStore = useStore();
  const searchParams = useSearchParams();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const latitudeParam = parseFloat(searchParams.get("latitude") ?? "");
    const longitudeParam = parseFloat(searchParams.get("longitude") ?? "");

    if (!isNaN(latitudeParam) && !isNaN(longitudeParam)) {
      setLatitude(latitudeParam);
      setLongitude(longitudeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (rootStore && latitude !== null && longitude !== null) {
      rootStore.fetchWeather({ latitude, longitude });
    }
  }, [rootStore, latitude, longitude]);

  return (
    <div className="h-full w-full  flex flex-col">
      <div className="flex items-center shadow-black shadow-2xl py-2 px-5 rounded-2xl">
        <div className="text-white text-3xl font-semibold">Weather App</div>
        <img src="/weather-logos.png" className="h-16" />
      </div>

      <div className="h-full mt-5 shadow-black shadow-2xl overflow-hidden w-full flex p-3">
        <div className="">
          <div className="text-white text-2xl text-center font-semibold">
            City Location
          </div>
          {latitude !== null && longitude !== null && (
            <DynamicMap lat={latitude} lon={longitude} />
          )}
        </div>
      </div>
    </div>
  );
});

export default WeatherPage;
