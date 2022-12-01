import React from "react";
import { MutatingDots } from "react-loader-spinner";
import "../../Pages/Home/home.css";

const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 bg">
      <div>
        <div className="d-flex justify-content-center">
          <MutatingDots
            height="100"
            width="100"
            color="#fff"
            secondaryColor="#fff"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
        <h4 className="text-center text-white">Collecting Data</h4>
      </div>
    </div>
  );
};

export default LoadingScreen;
