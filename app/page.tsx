"use client";
import Image from "next/image";
import TaskTable from "./components/tasktable";
import { enableStaticRendering } from "mobx-react-lite";
import { useStore } from "./models/RootStore";
import Map from "./components/Map";
import Select, { StylesConfig } from "react-select";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SearchInput from "./components/SearchBar";
import { text } from "stream/consumers";
import { observer } from "mobx-react-lite";
const DynamicMap = dynamic(() => import("./components/Map"), {
  ssr: false,
});

const Home = observer(() => {
  const rootStore = useStore();
  const options = [
    { value: "population < 250", label: "Population < 250 " },
    {
      value: "population > 250 and population < 500",
      label: "Population > 250 and Population < 500",
    },
    {
      value: "population > 500 and population < 750",
      label: "Population > 500 and Population < 750",
    },
    {
      value: "population > 750 and population < 1000",
      label: "Population > 750 and Population < 1000",
    },
  ];
  const [selectedOption, setSelectedOption] = useState<any>(null);
  useEffect(() => {
    if (rootStore) {
      rootStore.fetchCitiesData({
        offset: 0,
        where: selectedOption ? selectedOption?.value : "",
      });
    }
  }, [rootStore, selectedOption]);
  const handleClear = () => {
    setSelectedOption(null); // Clear the value
  };

  const customStyles: StylesConfig<any, true, any> = {
    control: (base, { isFocused }: { isFocused: boolean }) => ({
      ...base,
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.1rem",
      background: "#262626",
      color: "#FFFFFF", // Change text color to white
    }),
    option: (base, { isSelected }: { isSelected: boolean }) => ({
      ...base,
      background: "#262626",
      color: "#FFFFFF", // Change text color to white
      ":active": {
        backgroundColor: isSelected ? "#6B7280" : "#F3F4F6",
      },
      "&:hover": {
        backgroundColor: "#6B7280",
      },
      hover: "#262626",
    }),
    // Add more custom styles as needed
  };

  return (
    <div className="h-full w-full  flex flex-col relative">
      <div className="flex items-center shadow-black shadow-2xl py-2 px-5 rounded-2xl">
        <div className="flex items-center min-w-max">
          <div className="text-white text-3xl font-semibold">Wehather App</div>
          <img src="/weather-logos.png" className="h-16" />
        </div>

        <div className="flex justify-around w-full pl-4 relative">
          <SearchInput />
          <Select
            className="w-96"
            placeholder={"Filter"}
            styles={customStyles}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            components={{
              ClearIndicator: () => (
                <button type="button" onClick={handleClear}>
                  sdsdsd
                </button>
              ),
            }}
          />
        </div>
      </div>

      <div className="mt-5 shadow-black shadow-2xl h-full w-full flex p-3 overflow-hidden">
        <div className="">
          {" "}
          <div className="text-white text-2xl text-center font-semibold">
            My Location
          </div>
          <DynamicMap />
        </div>
        <TaskTable rootStore={rootStore} />
      </div>
    </div>
  );
});

export default Home;
