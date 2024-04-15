import {
  Instance,
  applySnapshot,
  flow,
  getSnapshot,
  types as t,
} from "mobx-state-tree";
import { PlayerModel } from "./PlayerModel";
import { CitiesModel, cityModel } from "./CitiesModel";
import { mockData } from "./helper";
import { weatherModel } from "./WeatherModel";

export type result = {
  coordinates: {
    lon: number;
    lat: number;
  };
  timezone: string;
  population: number;
  name: string;
  cou_name_en: string;
  geoname_id: string;
};

export type tableType = {
  total_count: number;
  results: result[];
};

export const RootStore = t
  .model("RootStore", {
    players: t.array(PlayerModel),
    cities: CitiesModel,
    weather: weatherModel,
    citiesLoading: t.boolean,
  })

  .actions((store) => ({
    fetchCitiesData: flow(function* ({
      offset,
      where,
    }: {
      offset?: number;
      where?: string;
    }) {
      try {
        store.citiesLoading = true;
        const response = yield fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}&where=${where}`
        );

        const responseData: tableType = yield response.json();

        const citiesData: Instance<typeof cityModel>[] =
          responseData.results.map((cityData) => {
            return cityModel.create({
              longitude: cityData.coordinates.lon,
              latitude: cityData.coordinates.lat,

              timezone: cityData.timezone,
              population: cityData.population,
              name: cityData.name,
              cou_name_en: cityData.cou_name_en,
              geoname_id: cityData.geoname_id,
            });
          });

        store.cities.results.replace(citiesData);
        store.cities.total_count = responseData.total_count;
        store.citiesLoading = false;

        // Replace with the array of CityModel instances
      } catch (error) {
        console.error("Failed to fetch cities data");
      }
    }),
    fetchWeather: flow(function* ({
      longitude,
      latitude,
    }: {
      longitude: number;
      latitude: number;
    }) {
      try {
        const response = yield fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f3ce6b97722b9d007b1d00e2f442432d`
        );

        const responseData = mockData;

        const data = weatherModel.create(responseData);
        store.weather = data;
      } catch (error) {
        console.error("Failed to fetch cities data", error);
      }
    }),
  }))
  .views((store) => ({
    latitude(index: number) {
      return store.cities.results[index]?.latitude;
    },
    longitude(index: number) {
      return store.cities.results[index]?.longitude;
    },
  }));

export type RootStoreType = Instance<typeof RootStore>;
export type RootType = typeof RootStore;

let rootStore: RootStoreType;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      players: [
        {
          num: { lat: 34, lng: 34 },
          name: "Jame",
          age: "34",
          status: true,
        },
      ],
      cities: { total_count: 0, results: [] },
      weather: {
        cod: "",
        list: [],
        cnt: 0,
        message: 0,
        city: {
          id: 0,
          name: "",
          coord: {
            lat: 0,
            lon: 0,
          },
          country: "",
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
        },
      },
      citiesLoading: false,
    });

    return rootStore;
  } else {
    return rootStore;
  }
}
