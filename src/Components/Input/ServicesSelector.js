import React from "react";
import { Checkbox } from "antd";

const ServicesSelector = ({ onServicesChange, options }) => {
  return (
    <React.Fragment>
      <Checkbox.Group options={options} onChange={onServicesChange} />
    </React.Fragment>
  );
};

export default ServicesSelector;
