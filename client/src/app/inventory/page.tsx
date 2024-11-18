"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";
import loading from "react-useanimations/lib/loading";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

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

  if (isError || !products) {
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
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
