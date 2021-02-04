import React from "react";
import SubnetAddModal from "./Input/SubnetAddModal";

import { Button, Collapse, Radio } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import styles from "./AZCollapse.module.css";

const { Panel } = Collapse;

const AZCollapse = ({ AZs, dispatch }) => {
  const handleDelete = (event, i) => {
    dispatch({ type: "DELETE_AZ", payload: i });
    event.stopPropagation();
  };

  const onNATChange = (event, i) => {
    dispatch({ type: "CHANGE_NAT", payload: [event.target.value, i] });
  };

  const deleteButton = (i) => {
    return (
      <Button
        danger
        shape="circle"
        size="small"
        type="text"
        icon={<DeleteOutlined />}
        onClick={(event) => handleDelete(event, i)}
      />
    );
  };
  return (
    <Collapse defaultActiveKey={["1"]}>
      {AZs.map((AZ, i) => (
        <Panel header={AZ.name} key={i} extra={deleteButton(i)}>
          <div className={styles.row}>
            <div>NAT Type</div>
            <Radio.Group value={AZ.NATType} onChange={(e) => onNATChange(e, i)}>
              <Radio.Button value="AWS::EC2::NatGateway">Gateway</Radio.Button>
              <Radio.Button value="AWS::EC2::Instance">Instance</Radio.Button>
            </Radio.Group>
          </div>
          <br />
          {AZ.publicSubnets.length > 0 && (
            <div>
              <b>Public Subnets:</b>
            </div>
          )}
          {AZ.publicSubnets.map((subnet, j) => (
            <div className={"region-subnet"} key={`public-subnet-${j}`}>
              <div>
                {`${subnet.name}`}
                <Button
                  danger
                  shape="circle"
                  size="small"
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() =>
                    dispatch({
                      type: "DELETE_SUBNET",
                      payload: {
                        azIndex: i,
                        subnetType: "public",
                        subnetIndex: j,
                      },
                    })
                  }
                />
              </div>
              <div>
                Services:{" "}
                {subnet.services.length ? (
                  subnet.services.join(", ")
                ) : (
                  <i>empty</i>
                )}
              </div>
              <div>IP Range: {subnet.ip ? subnet.ip : <i>empty</i>}</div>
              <br />
            </div>
          ))}
          {AZ.privateSubnets.length > 0 && (
            <div>
              <b>Private Subnets:</b>
            </div>
          )}
          {AZ.privateSubnets.map((subnet, j) => (
            <div className={"region-subnet"} key={`private-subnet-${j}`}>
              <div>
                {`${subnet.name}`}
                <Button
                  danger
                  shape="circle"
                  size="small"
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() =>
                    dispatch({
                      type: "DELETE_SUBNET",
                      payload: {
                        azIndex: i,
                        subnetType: "private",
                        subnetIndex: j,
                      },
                    })
                  }
                />
              </div>
              <div>{`Services: ${subnet.services}`}</div>
              <div>{subnet.ip && `IP Range: ${subnet.ip}`}</div>
              <br />
            </div>
          ))}
          <SubnetAddModal dispatch={dispatch} azNumber={i} />
        </Panel>
      ))}
    </Collapse>
  );
};

export default AZCollapse;
