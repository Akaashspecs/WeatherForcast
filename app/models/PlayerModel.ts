import { types as t } from "mobx-state-tree";

export const PlayerModel = t
  .model("PlayerModel", {
    num: t.model({
      lat: t.number,
      lng: t.number,
    }),
    age: t.string,
    name: t.string,
    status: t.boolean,
  })
  .views((player) => ({
    get inOrOut() {
      return player.status ? "In" : "Out";
    },
  }));
