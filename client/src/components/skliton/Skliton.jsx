import { Skeleton } from "antd";
import React from "react";

const Skliton = ({ formName }) => {
  return (
    <div className="px-5 xs:px-2">
      {/* input Skeleton */}
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton.Input
            key={index}
            style={{ width: "100%", height: "60px", marginBottom: "30px" }}
            active
          />
        ))}
      </div>
      {formName === "attribute" ? (
        <div>
          {/* Typography Skeleton */}
          <div>
            <Skeleton
              title={false}
              paragraph={{ rows: 1, width: "25%" }}
              active
            />
          </div>
          {/* input Skeleton */}
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 mt-5 mb-5">
            <Skeleton.Input style={{ width: "200%", height: "60px" }} active />
            <span></span>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton.Input
                key={index}
                style={{ width: "10%", height: "60px" }}
                active
              />
            ))}
          </div>
          {/* Typography Skeleton */}
          <div>
            <Skeleton
              title={false}
              paragraph={{ rows: 1, width: "8%" }}
              active
            />
          </div>
          {/* button Skeleton */}
          <div className="flex justify-end">
            <Skeleton.Input
              style={{
                width: "7%",
                height: "40px",
                marginTop: "16px",
              }}
              active
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Skliton;
