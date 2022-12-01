import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

const DatePicker = ({ handleShowAstriods }) => {
  const [range, setRange] = useState();

  return (
    <>
      <div className="d-flex justify-content-center">
        <DayPicker
          className="bg-white px-4 py-3 rounded"
          defaultMonth={new Date()}
          mode="range"
          min={3}
          max={7}
          selected={range}
          onSelect={setRange}
        />
      </div>
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-info text-white"
          onClick={() => handleShowAstriods(range)}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default DatePicker;
