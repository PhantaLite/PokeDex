import React from "react";

interface ProgressBarProps {
  stat: string;
  statName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stat, statName }) => {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-12 col-md-3">{statName}</div>
        <div className="col-12 col-md-9">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressBar"
              style={{
                width: `${stat}%`,
              }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <small>{stat}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
