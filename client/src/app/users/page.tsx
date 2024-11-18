"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";
import loading from "react-useanimations/lib/loading";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <UseAnimations
          animation={loading}
          strokeColor="black"
          size={36}
          wrapperStyle={{ marginBottom: "8px" }}
        />
        <span>Loading</span>
      </div>
    );
  }

  if (isError || !users) {
    return (
      <div className=" flex items-center justify-center text-red-500 py-4">
       <div className="flex flex-col items-center justify-center">
          <UseAnimations
            animation={alertOctagon}
            strokeColor="red"
            size={36}
            wrapperStyle={{ marginBottom: "8px" }}
          />
          <span className="text-red-500 text-lg">
            Failed to fetch products
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
