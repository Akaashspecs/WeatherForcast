// Suppose you have an MST store for articles
import { types, flow } from "mobx-state-tree";

export const cityModel = types.model("City", {
  longitude: types.number,
  latitude: types.number,

  timezone: types.string,
  population: types.number,
  name: types.string,
  cou_name_en: types.string,
  geoname_id: types.string,
});

export const CitiesModel = types.model("Cities", {
  total_count: types.number,
  results: types.array(cityModel),
});
