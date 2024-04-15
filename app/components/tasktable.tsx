"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import {
  RootStoreType,
  RootType,
  tableType,
  useStore,
} from "../models/RootStore";
import { observer } from "mobx-react-lite";
import "../globals.css";
import Link from "next/link";
import { TbArrowsSort } from "react-icons/tb";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { useInView } from "react-intersection-observer";

const TaskTable = observer(({ rootStore }: { rootStore: RootStoreType }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "name",
        cell: (props: any) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: "geoname_id",
        header: "Geoname id",
        cell: (props: any) => {
          return <p>{props.getValue()}</p>;
        },
      },
      {
        accessorKey: "population",
        header: "population",
        cell: (props: any) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: "cou_name_en",
        header: "country name",
        cell: (props: any) => <p>{props.getValue()}</p>,
      },
      // {
      //   accessorKey: "latitude",
      //   header: "latitude",
      //   cell: (props: any) => <p>{props.getValue()}</p>,
      // },
      // {
      //   accessorKey: "longitude",
      //   header: "longitude",
      //   cell: (props: any) => <p>{props.getValue()}</p>,
      // },
      // {
      //   accessorKey: "coordinates",
      //   header: "Longitude",
      //   cell: (props: any) => <p>{props.getValue().lon}</p>,
      // },
    ],
    [rootStore.cities.results] // Empty dependency array ensures columns are stable
  );

  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),
  });
  const { ref, inView } = useInView({ threshold: 0 });
  console.log(
    "ddccccccccccvcvcvcvcvcvcv",
    rootStore.cities.results.map((item) => item.name)
  );
  const fetchMoreData = () => {
    setIsLoading(true);
    // Simulate fetching data from an API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Update tableData state when rootStore.cities.results changes
    setTableData(rootStore.cities.results);
  }, [rootStore.cities.results]);

  useEffect(() => {
    console.log("ddccccccccccvcvcvcvcvcvcv");
    if (inView && !isLoading) {
      fetchMoreData();
    }
  }, [inView]);

  if (rootStore.citiesLoading === true) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div className="no-scroll  w-full h-full overflow-hidden overflow-y-scroll  rounded-3xl ml-3">
      <table className=" w-full text-left">
        <thead className="bg-indigo-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="capitalize px-3.5 py-2 text-white"
                >
                  <div className="flex">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <TbArrowsSort
                        className="ml-1 mt-1 hover:cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === "asc" ? (
                          <TiArrowSortedUp />
                        ) : (
                          <TiArrowSortedDown />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="h-96 overflow-hidden ">
          {rootStore.cities.results.length > 0 ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? "bg-neutral-800" : "bg-neutral-900"}
                `}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td key={cell.id} className="px-3.5 py-2 text-white">
                      {cell.column.id === "name" ? (
                        <div className="">
                          <Link
                            className="w-min"
                            href={{
                              pathname: "/weather",
                              query: {
                                longitude: rootStore
                                  .longitude(+cell.row.id)
                                  .toString(),
                                latitude: rootStore
                                  .latitude(+cell.row.id)
                                  .toString(),
                              }, // Pass longitude data as query parameter
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        </div>
                      ) : (
                        <div>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
          {isLoading && (
            <tr>
              <td colSpan={2}>Loading...</td>
            </tr>
          )}
          <tr ref={ref}></tr>
        </tbody>
      </table>
    </div>
  );
});

export default TaskTable;
