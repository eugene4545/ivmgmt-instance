import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import loading from "react-useanimations/lib/loading";
import Image from "next/image";

const CardPopularProducts = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    isError,
  } = useGetDashboardMetricsQuery();

  if (isLoading) {
    return (
      <div className="m-5">
        <UseAnimations
          animation={loading}
          strokeColor="red"
          size={36}
          wrapperStyle={{ marginBottom: "8px" }}
        />
        <span>Loading...</span>
      </div>
    );
  }

  if (isError || !dashboardMetrics) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
        <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
          Popular Products
        </h3>
        <hr />
        <div className="flex items-center justify-center h-full py-4">
          <div className="flex flex-col items-center justify-center">
            <UseAnimations
              animation={activity}
              strokeColor="red"
              size={36}
              wrapperStyle={{ marginBottom: "8px" }}
            />
            <span className="text-red-300 font-semibold text-lg">No Data</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Popular Products</h3>
      <hr />
      <div className="overflow-auto h-full">
        {dashboardMetrics?.popularProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between gap-3 px-5 py-7 border-b"
          >
            <div className="flex items-center gap-3">
              <Image
                src={`https://s3-inventmanagement.s3.us-east-1.amazonaws.com/product${
                  Math.floor(Math.random() * 3) + 1
                }.png`}
                alt={product.name}
                width={48}
                height={48}
                className="rounded-lg w-14 h-14"
              />
              <div className="flex flex-col justify-between gap-1">
                <div className="font-bold text-gray-700">{product.name}</div>
                <div className="flex text-sm items-center">
                  <span className="font-bold text-blue-500 text-xs">
                    ${product.price}
                  </span>
                  <span className="mx-2">|</span>
                  <Rating rating={product.rating || 0} />
                </div>
              </div>
            </div>

            <div className="text-xs flex items-center">
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                <ShoppingBag className="w-4 h-4" />
              </button>
              {Math.round(product.stockQuantity / 1000)}k Sold
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPopularProducts;
