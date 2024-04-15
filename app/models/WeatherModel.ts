// Suppose you have an MST store for articles
import { types as t } from "mobx-state-tree";

export const weatherModel = t.model("City", {
  cod: t.string,
  message: t.number,
  cnt: t.number,
  list: t.array(
    t.model({
      dt: t.number,
      main: t.model({
        temp: t.number,
        feels_like: t.number,
        temp_min: t.number,
        temp_max: t.number,
        pressure: t.number,
        sea_level: t.number,
        grnd_level: t.number,
        humidity: t.number,
        temp_kf: t.number,
      }),
      weather: t.array(
        t.model({
          id: t.number,
          main: t.string,
          description: t.string,
          icon: t.string,
        })
      ),
      clouds: t.model({
        all: t.number,
      }),
      wind: t.model({
        speed: t.number,
        deg: t.number,
        gust: t.number,
      }),
      visibility: t.number,
      pop: t.number,
      rain: t.maybe(
        // Use t.maybe to make rain key optional
        t.model({
          "3h": t.number,
        })
      ),
      sys: t.model({
        pod: t.string,
      }),
      dt_txt: t.string,
    })
  ),
  city: t.model({
    id: t.number,
    name: t.string,
    coord: t.model({
      lat: t.number,
      lon: t.number,
    }),
    country: t.string,
    population: t.number,
    timezone: t.number,
    sunrise: t.number,
    sunset: t.number,
  }),
});
