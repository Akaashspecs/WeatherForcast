import { ChangeEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { result, tableType } from "../models/RootStore";
import "./SearchBar.css";
import Link from "next/link";
// import { debounce } from "lodash";

const SearchInput = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [values, setValues] = useState<result[] | null>(null);

  const handleRemoveValue = () => {
    setSearchValue("");
    setShowSearch(false);
    setValues(null);
  };

  const handleSearchInputClick = () => {
    setShowSearch(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchValue.length > 0) {
          const response = await fetch(
            `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&where=name like "${searchValue}" `
          ).then((res) => res);

          const beta = await response.json();

          setValues(beta.results);
        }
        if (searchValue.length === 0) {
          setValues(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <div className="relative">
      <div className="relative bg-neutral-900 rounded-full z-50 shadow-2xl">
        <div
          className="w-64 relative border h-8 shadow-2xl border-gray-950 border-b-indigo-600 border-l-indigo-600 rounded-full px-1.5 py-0.5 flex z-50 items-center "
          onClick={handleSearchInputClick}
        >
          <CiSearch className="text-white z-50 relative" />
          <input
            type="text"
            className="navsearch relative pl-2 border-none bg-neutral-900 text-white z-50"
            placeholder="Search Here..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <div
            className="flex text-center text-white  justify-center items-center opacity-75 hover:cursor-pointer ml-3"
            onClick={handleRemoveValue}
          >
            {" "}
            x{" "}
          </div>
        </div>
      </div>
      {showSearch && values && (
        <div className="no-scroll overflow-y-scroll  w-64 max-h-52 pt-3 bg-neutral-800 absolute z-10 top-4 border border-y-0    border-t-none border-black flex flex-col rounded-b-xl shadow-2xl ">
          {values &&
            values.map((item) => (
              <Link
                key={item.geoname_id}
                href={{
                  pathname: "/weather",
                  query: {
                    longitude: item.coordinates.lon,
                    latitude: item.coordinates.lat,
                  }, // Pass longitude data as query parameter
                }}
              >
                <div
                  className="border border-t-0 border-black border-x-0 py-1 px-1.5 flex  items-center cursor-pointer hover:bg-neutral-900 "
                  onClick={(e) => handleRemoveValue}
                >
                  <img
                    src={"/building.png"}
                    alt="SVG as an image"
                    className="h-4 w-4"
                  />
                  <div className="pl-2 text-white">{item.name}</div>
                </div>
              </Link>
            ))}
          {searchValue && values?.length === 0 && (
            <div className=" bg-neutral-800 h-14 w-full flex justify-center items-center">
              No Data Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
