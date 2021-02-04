import { Modal, Button, Radio, Input } from "antd";
import React, { useState } from "react";
import ServicesSelector from "./ServicesSelector";

const SubnetAddModal = ({ azNumber, dispatch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState("public");
  const [services, setServices] = useState([]);
  const [ip, setIp] = useState("");

  const servicesOptions = [
    { label: "S3", value: "S3"},
    { label: "EC2", value: "EC2" },
    { label: "GuardDuty", value: "GuardDuty" },
    { label: "DB", value: "DB", warningOnPublic: true},
  ];

  const showModal = () => {
    setServices([]);
    setType("public");
    setIsModalVisible(true);
  };
  const handleOk = () => {
    dispatch({
      type: "ADD_SUBNET",
      payload: {
        type,
        services,
        azNumber,
        ip,
      },
    });
    setIp("");
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onServicesChange(newServices) {
    let added = newServices.filter(x => services.indexOf(x)===-1)[0];
    if(type==='public' && servicesOptions.filter(x => x.value === added && x.warningOnPublic).length >0 ){
      Modal.warning({
        title: 'Adding a private service to public subnet!',
        content: 'please note that such service is better to be added to private instead of public subnet',
      });
    }
    setServices(newServices);
  }

  function onRadioChange(val) {
    setType(val.target.value);
  }

  function onIpChange(ip) {
    setIp(ip.target.value);
  }

  return (
    <>
      <Button block type="primary" onClick={showModal}>
        Add Subnet
      </Button>
      {isModalVisible && (
        <Modal
          title="Add Subnet"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
          ]}
        >
          <h3>Subnet Type</h3>
          <Radio.Group defaultValue={type} onChange={onRadioChange}>
            <Radio.Button value="public">public subnet</Radio.Button>
            <Radio.Button value="private">private subnet</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          <h3>Subnet Services</h3>
          <ServicesSelector options={servicesOptions} onServicesChange={onServicesChange} />
          <br />
          <br />
          <h3>IP Address Block</h3>
          <Input onChange={onIpChange} placeholder="xxx.xxx.xxx.xxx/xxx" />
        </Modal>
      )}
    </>
  );
};

export default SubnetAddModal;
