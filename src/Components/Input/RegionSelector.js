import React from "react";
import { Select, Modal } from "antd";
import { getRegionsList } from "../../data-utils";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;

const RegionSelector = ({ dispatch, setNumAZs, onChangeRegion }) => {
  const regions = getRegionsList();

  const onRegionChange = (val) => {
    confirm({
      title: 'Changing the region will reset your current progress',
      icon: <ExclamationCircleOutlined />,
      content: 'click ok to change region and reset progress or cancel to go back',
      onOk() {
        const region = regions[val];
        setNumAZs(region.azNumber);
        onChangeRegion();
        dispatch({ type: "CHANGE_REGION", payload: region.regionName });
        },
      onCancel() {
      },
    });

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
