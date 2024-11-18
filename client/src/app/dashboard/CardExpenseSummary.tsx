import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp } from "lucide-react";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import loading from "react-useanimations/lib/loading"

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    isError,
  } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary[0];

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + "Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  if(isLoading)  {
    return <div className="m-5">
      <UseAnimations
             animation={loading}
             strokeColor="red"
             size={36}
             wrapperStyle={{ marginBottom: '8px' }}
           />
     <span>Loading...</span>
     </div>
   }  

  if (isError || !dashboardMetrics) {
   return ( <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between -mt-4">
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
          Expense summary
        </h2>
        <hr />
      </div>
      <div className="flex items-center justify-center h-full py-4">
        <div className="flex flex-col items-center justify-center">
          <UseAnimations
            animation={activity}
            strokeColor="red"
            size={36}
            wrapperStyle={{ marginBottom: "8px" }} // Adds spacing between icon and text
          />
          <span className="text-red-400 font-semibold text-lg">No Data</span>
        </div>
      </div>
    </div>
   )
  }

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between -mt-4">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
          Expense summary
        </h2>
        <hr />
      </div>
      {/* BODY */}
      <div className="xl:flex justify-between pr-7">
        {/* CHART */}
        <div className="relative basis-3/5">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={expenseCategories}
                innerRadius={50}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
            <span className="font-bold text-xl">${formattedTotalExpenses}</span>
          </div>
        </div>
        {/* LABELS */}
        <ul className="flex flex-col justify-arround items-center xl:items-start py-5 gap-3">
          {expenseCategories.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center text-xs">
              <span
                className="mr-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              {entry.name}
            </li>
          ))}
        </ul>
      </div>
      {/* FOOTER */}
      <div>
        <hr />
        {expenseSummary && (
          <div className="mt-auto flex justify-between items-center px-7 mb-4">
            <div className="pt-2">
              <p className="text-sm">
                Average:{" "}
                <span className="font-semibold">
                  ${expenseSummary.totalExpenses.toFixed(2)}
                </span>
              </p>
            </div>
            <span className="flex items-center mt-2">
              <TrendingUp className="mr-2 text-green-500" />
              30%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardExpenseSummary;
