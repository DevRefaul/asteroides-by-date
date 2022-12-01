import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(...registerables);
ChartJS.defaults.color = "#fff";

const ChartCompo = ({ datas }) => {
  //   let [astriodsPerDay, setAstriodsPerDay] = useState([]);

  const { element_count, near_earth_objects } = datas;
  const totalElements = Object?.keys(near_earth_objects);

  //   console.log(near_earth_objects);

  let fastestAstriod = 0;
  let averageDiameterInKM = 0;

  let closestAstriod = { name: "name", passingKilometer: 10000000000 };

  // settings charts data
  let labels = [];
  let totalAstroidsOnDays = [];

  return (
    <div className="my-4">
      <h2 className="text-center fw-semibold fs-2 py-3 text-white">
        Total Result Found : {element_count}
      </h2>

      {totalElements.map((element, idx) => {
        const dates = element;
        labels.push(dates);
        const astroids = near_earth_objects[`${element}`].length;
        totalAstroidsOnDays.push(astroids);
      })}
      <div className="d-flex justify-content-center">
        <Bar
          options={{ responsive: true, scales: {} }}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Astroids Per Day",
                data: totalAstroidsOnDays,
                backgroundColor: "#fff",
              },
            ],
            color: "#fff",
          }}
        />
      </div>

      <div className="my-5 row gx-3 gy-4">
        {totalElements.map((element, idx) => {
          const values = near_earth_objects[`${element}`];

          let chartLabels = [];
          const value = values?.map((value) => {
            chartLabels.push(...chartLabels, value.name);
            console.log(value);
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
            //   gettings value for calculating average diameter
            const averageDiameter = parseFloat(
              value?.estimated_diameter?.kilometers?.estimated_diameter_max
            );
            averageDiameterInKM = averageDiameterInKM + averageDiameter;
          });

          return (
            <div className="col-1 col-md-2 col-lg-3 col-xl-4" key={idx}>
              <div className=" bg-light text-dark rounded-2 p-3">
                <h4 className="text-center mb-4">
                  Total {values?.length} Asteroid on {element}
                </h4>
                <p className="  fw-semibold lh-1">
                  Fastest Asteroid : {fastestAstriod}
                </p>
                <p className=" fw-semibold lh-1">
                  Average Size : {averageDiameterInKM / values?.length} km
                </p>
                <p className="  fw-semibold lh-1">
                  Closest Asteroid Name: {closestAstriod?.name}
                </p>
                <p className=" fw-semibold lh-1">
                  Closest Asteroid Distance: {closestAstriod?.passingKilometer}
                  km
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCompo;
