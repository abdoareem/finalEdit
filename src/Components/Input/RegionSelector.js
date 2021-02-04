import React from "react";
import { Select } from "antd";
import { getRegionsList } from "../../data-utils";

const { Option } = Select;

const RegionSelector = ({ dispatch, setNumAZs }) => {
  const regions = getRegionsList();

  const onRegionChange = (val) => {
    const region = regions[val];
    setNumAZs(region.azNumber);
    dispatch({ type: "CHANGE_REGION", payload: region.regionName });
  };

  return (
    <React.Fragment>
      <Select style={{ width: 160 }} defaultValue={0} onChange={onRegionChange}>
        {regions.map((region, i) => (
          <Option key={i} value={i}>
            {region.regionName}
          </Option>
        ))}
      </Select>
    </React.Fragment>
  );
};

export default RegionSelector;
