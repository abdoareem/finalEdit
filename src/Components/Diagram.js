import React, { useEffect, useLayoutEffect, useState } from "react";

import Subnet from "./Diagram/Subnet.js";
import { getSubnetHeight } from "./Diagram/Utils.js";

import { ReactComponent as NATGatewayIcon } from "../Assets/Icons/NATGateway.svg";
import { ReactComponent as NATInstanceIcon } from "../Assets/Icons/NATInstance.svg";
import { ReactComponent as PublicSubnetIcon } from "../Assets/Icons/PublicSubnet.svg";
import { ReactComponent as VPCIcon } from "../Assets/Icons/VPC.svg";

import {
  AZ_WIDTH,
  AZ_MARGIN,
  AZ_OFFSET,
  SUBNET_WIDTH,
  SUBNET_HEIGHT,
  SUBNET_MARGIN,
  SUBNET_GAP,
} from "./Diagram/Constants.js";

const styles = {
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    border: "1px solid #f0f0f0",
    padding: 20,
  },
  diagram: {
    border: "1px solid #248814",
  },
  VPCText: {
    fontSize: 13,
    fill: "#248814",
  },
  azFlex: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
  },
};

const azStyles = {
  az: {
    width: AZ_WIDTH,
    fill: "transparent",
    stroke: "#147EBA",
    strokeDasharray: 5,
    strokeWidth: 1,
  },
  NATSubnet: {
    width: SUBNET_WIDTH,
    height: SUBNET_HEIGHT,
    fill: "#E9F3E6",
  },
  text: {
    fontSize: 13,
    fill: "navy",
  },
  subnetText: {
    fontSize: 13,
    fill: "#248814",
  },
  gatewayText: {
    fontSize: 13,
    fill: "black",
  },
  lightText: {
    fontSize: 13,
    fontWeight: 300,
    fill: "black",
  },
};

const NATSubnet = ({ NATType, i }) => {
  const iconX = i * AZ_OFFSET + SUBNET_MARGIN + SUBNET_WIDTH / 2 - 24;
  const iconY = SUBNET_MARGIN + 34;
  const textX = i * AZ_OFFSET + SUBNET_MARGIN + SUBNET_WIDTH / 2;
  const textY = iconY + 48 + 18;
  const subnetY = SUBNET_MARGIN + 18;
  return (
    <>
      <rect
        x={i * AZ_OFFSET + SUBNET_MARGIN}
        y={SUBNET_MARGIN}
        style={azStyles.NATSubnet}
      />
      <PublicSubnetIcon x={i * AZ_OFFSET + SUBNET_MARGIN} y={SUBNET_MARGIN} />
      <text
        x={i * AZ_OFFSET + SUBNET_MARGIN + 32}
        y={subnetY}
        dominantBaseline="bottom"
        textAnchor="left"
        style={azStyles.subnetText}
      >
        Public Subnet
      </text>
      {NATType == "AWS::EC2::NatGateway" ? (
        <NATGatewayIcon x={iconX} y={iconY} />
      ) : (
        <NATInstanceIcon x={iconX} y={iconY} />
      )}
      <text
        x={textX}
        y={textY}
        dominantBaseline="top"
        textAnchor="middle"
        style={azStyles.gatewayText}
      >
        {NATType == "AWS::EC2::NatGateway" ? "NAT Gateway" : "NAT Instance"}
      </text>
    </>
  );
};

function Diagram({ AZs }) {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  /* Calculate the largest AZ height we will need based on the
     height of the subnets in each AZ */
  const [azHeight, setAzHeight] = useState(200);
  useEffect(() => {
    let maxHeight = 0;
    AZs.forEach((az) => {
      let height = 0;
      const subnets = az.publicSubnets.concat(az.privateSubnets);
      subnets.forEach((subnet) => {
        height += getSubnetHeight(subnet) + SUBNET_GAP;
      });
      maxHeight = Math.max(maxHeight, height);
    });
    setAzHeight(maxHeight + 190);
  }, [AZs]);

  /* Resize the svg to fit its contents */
  const svgBBox =
    document.getElementById("svg") && document.getElementById("svg").getBBox();
  useLayoutEffect(() => {
    var bbox = document.getElementById("svg").getBBox();
    setWidth(bbox.x + bbox.width + bbox.x + AZ_MARGIN);
    setHeight(bbox.y + bbox.height + bbox.y + AZ_MARGIN);
  }, [svgBBox]);

  return (
    <div style={styles.container}>
      <svg
        id="svg"
        width={width}
        height={height}
        preserveAspectRatio="none"
        style={styles.diagram}
      >
        <VPCIcon x={0} y={0} />
        <text
          x={32}
          y={18}
          dominantBaseline="bottom"
          textAnchor="left"
          style={styles.VPCText}
        >
          VPC
        </text>
        {AZs.map((az, i) => (
          <g key={i}>
            <rect
              x={i * AZ_OFFSET + AZ_MARGIN}
              y={AZ_MARGIN}
              key={i}
              style={azStyles.az}
              height={String(azHeight)}
            />
            <NATSubnet NATType={az.NATType} i={i} />
            {az.publicSubnets.map((subnet, j) => (
              <Subnet
                subnet={subnet}
                subnets={az.publicSubnets}
                azIdx={i}
                subnetIdx={j}
                key={j}
                isPrivate={false}
              />
            ))}
            {az.privateSubnets.map((subnet, k) => (
              <Subnet
                subnet={subnet}
                subnets={az.publicSubnets.concat(az.privateSubnets)}
                azIdx={i}
                subnetIdx={k + az.publicSubnets.length}
                key={k}
                isPrivate={true}
              />
            ))}
            <text
              x={
                i * AZ_OFFSET +
                SUBNET_MARGIN / 2 +
                AZ_WIDTH / 2 +
                AZ_MARGIN / 2 -
                9
              }
              y={azHeight + AZ_MARGIN - 20}
              dominantBaseline="bottom"
              textAnchor="middle"
              style={azStyles.text}
            >
              {az.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default Diagram;
