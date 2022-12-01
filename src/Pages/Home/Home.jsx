import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "../../Components/DatePicker/DatePicker";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import getData from "./apiFunction";
import Chart from "./Chart";

const Home = () => {
  const [datas, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowAstriods = async (range) => {
    if (range === undefined) {
      return toast.error("Please Select Date Range");
    }

    const startRange = format(range.from, "P");
    const endRange = format(range.to, "P");
    // //   start dates
    const startYear = startRange.split("/")[2];
    const startMonth = startRange.split("/")[0];
    const startDay = startRange.split("/")[1];
    const startDate = `${startYear}-${startMonth}-${startDay}`;

    // //   ending dates
    const endYear = endRange.split("/")[2];
    const endMonth = endRange.split("/")[0];
    const endDay = endRange.split("/")[1];
    const endDate = `${endYear}-${endMonth}-${endDay}`;

    setLoading(true);
    // //   getting data from api
    const datas = await getData(startDate, endDate);
    setData(datas);
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="overflow-scroll vh-100 "
      style={{
        background: "linear-gradient(to top, #4E65FF, #92EFFD)",
      }}
    >
      <h2 className="text-center text-white fs-1 pt-5">
        Search For Astriods By Date
      </h2>
      {/* date picker component */}
      <DatePicker handleShowAstriods={handleShowAstriods} />

      {/* chart component */}
      {datas && <Chart datas={datas} loading={loading} />}
    </div>
  );
};

export default Home;
