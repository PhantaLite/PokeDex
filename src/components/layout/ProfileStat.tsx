import React from "react";

interface ProfileStatProps {
  bioName: string;
  profileStat?: number;
  metricUnit?: string;
  hasProgressBar?: boolean;
}

const ProfileStat: React.FunctionComponent<ProfileStatProps> = ({
  bioName,
  profileStat,
  metricUnit,
  hasProgressBar,
  children,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <h6 className="float-right">{bioName}</h6>
        </div>
        <div className="col-md-6">
          {hasProgressBar && <h6 className="float-right">{children}</h6>}
          <h6>
            {profileStat} {metricUnit}
          </h6>
        </div>
      </div>
    </>
  );
};

export default ProfileStat;
