import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ datas }) => {
  const { element_count, near_earth_objects } = datas;
  const totalElements = Object?.keys(near_earth_objects);

  console.log(near_earth_objects);
  let fastestAstriod = 0;
  let averageDiameterInKM = 0;

  let closestAstriod = { name: "name", passingKilometer: 10000000000 };

  console.log(
    `"fastest astriod" + ${fastestAstriod}`,
    `"averageDiameterInKM" + ${averageDiameterInKM}`,
    `"closestAstriod" + ${
      closestAstriod.name + "kilo" + closestAstriod.passingKilometer
    }`
  );
  return (
    <div className="my-4">
      <h2 className="text-center fw-semibold fs-2 py-3 text-white">
        Total Result Found : {element_count}
      </h2>

      <div>
        {totalElements.map((element, idx) => {
          const values = near_earth_objects[`${element}`];

          let chartData;
          const value = values?.map((value) => {
            // console.log(value);

            // getting data for closest astroids
            const missingDistance = parseFloat(
              value?.close_approach_data[0]?.miss_distance?.kilometers
            );

            if (missingDistance < closestAstriod?.passingKilometer) {
              closestAstriod = {
                name: value?.name,
                passingKilometer: missingDistance,
              };
            }

            //   collecting data for fastest astriod
            const astriodSpeed = parseFloat(
              value?.close_approach_data[0].relative_velocity
                ?.kilometers_per_hour
            );
            if (astriodSpeed > fastestAstriod) {
              fastestAstriod = astriodSpeed;
            }
            //   setting chart data
            const maxDiameter = parseFloat(
              value?.estimated_diameter.kilometers?.estimated_diameter_max
            );
            chartData = {
              name: value?.name,
              maxDiameter: maxDiameter,
            };

            //   gettings value for calculating average diameter
            const averageDiameter = parseFloat(
              value?.estimated_diameter?.kilometers?.estimated_diameter_max
            );
            averageDiameterInKM = averageDiameterInKM + averageDiameter;
          });

          console.log(
            `"fastest astriod" + ${fastestAstriod}`,
            `"averageDiameterInKM" + ${averageDiameterInKM}`,
            `"closestAstriod" + ${
              closestAstriod.name + "kilo" + closestAstriod.passingKilometer
            }`
          );

          return (
            <div key={idx} className="my-5">
              <h4 className="text-center text-white">
                Total {values?.length} Astriods on {element}
              </h4>
              <p className="text-white text-center fw-fw-semibold lh-1">
                Fastest Astriod : {fastestAstriod}
              </p>
              <p className="text-white text-center fw-fw-semibold lh-1">
                Average Size : {fastestAstriod / values?.length} km
              </p>
              <p className="text-white text-center fw-fw-semibold lh-1">
                Closest Astriod Name: {closestAstriod?.name}
              </p>
              <p className="text-white text-center fw-fw-semibold lh-1">
                Closest Astriod Distance: {closestAstriod?.passingKilometer}
              </p>
              <div>{/* <Line options={""} data={} /> */}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
