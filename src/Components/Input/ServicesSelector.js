import React from "react";
import { Checkbox } from "antd";

const options = [
  { label: "S3", value: "S3" },
  { label: "EC2", value: "EC2" },
  { label: "GuardDuty", value: "GuardDuty" },
];

const ServicesSelector = ({ onServicesChange }) => {
  return (
    <React.Fragment>
      <Checkbox.Group options={options} onChange={onServicesChange} />
    </React.Fragment>
  );
};

export default ServicesSelector;
