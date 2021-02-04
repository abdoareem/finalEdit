import React from "react";

import { ReactComponent as PublicSubnetIcon } from "../../Assets/Icons/PublicSubnet.svg";
import { ReactComponent as PrivateSubnetIcon } from "../../Assets/Icons/PrivateSubnet.svg";

import {
  AZ_WIDTH,
  AZ_OFFSET,
  SUBNET_WIDTH,
  SUBNET_HEIGHT,
  SUBNET_MARGIN,
  SUBNET_GAP,
  SERVICE_MARGIN_X,
  SERVICE_MARGIN_Y,
  SERVICE_HEIGHT,
  SERVICE_WIDTH,
  SERVICE_GAP,
} from "./Constants.js";
import { ICONS } from "./Constants.js";

import { getSubnetHeight } from "./Utils.js";

const styles = {
  publicSubnet: {
    width: SUBNET_WIDTH,
    fill: "#E9F3E6",
  },
  publicSubnetText: {
    fontSize: 13,
    fill: "#248814",
  },
  privateSubnet: {
    width: SUBNET_WIDTH,
    fill: "#E6F2F8",
  },
  privateSubnetText: {
    fontSize: 13,
    fill: "#147EBA",
  },
  serviceText: {
    fontSize: 13,
    fontWeight: 500,
    fill: "black",
  },
  ipText: {
    fontSize: 13,
    fontWeight: 300,
    fill: "black",
  },
};

const layoutServices = (x, y, subnet) => {
  const services = subnet.services;
  let i = 0;
  let output = [];

  /* The services will be displayed as a grid with 2 columns
     if there is only one element in the last row then we display
     that element centred.
     So first we will display the services in rows that are full */
  const gridCount = services.length - (services.length % 2);
  for (i = 0; i < gridCount; i++) {
    const service = services[i];
    const row = Math.floor(i / 2);
    const col = i % 2;
    output.push({
      x: x + col * (SERVICE_WIDTH + SERVICE_GAP) + SERVICE_MARGIN_X,
      y: y + row * (SERVICE_HEIGHT + SERVICE_GAP) + SERVICE_MARGIN_Y,
      service: service,
    });
  }

  /* Now we will display any left over service centred in the row */
  if (services.length % 2 == 1) {
    const service = services[services.length - 1];
    const row = Math.floor(i / 2);
    output.push({
      x: x + SUBNET_WIDTH / 2 - SERVICE_WIDTH / 2,
      y: y + row * (SERVICE_HEIGHT + SERVICE_GAP) + SERVICE_MARGIN_Y,
      service: service,
    });
  }

  return output;
};

const Subnet = ({ subnet, subnets, azIdx, subnetIdx, isPrivate }) => {
  const subnetX = azIdx * AZ_OFFSET + SUBNET_MARGIN;
  const subnetHeight = getSubnetHeight(subnet);
  let subnetY = SUBNET_HEIGHT + SUBNET_GAP + SUBNET_MARGIN;
  subnets.slice(0, subnetIdx).forEach((element) => {
    subnetY += getSubnetHeight(element) + SUBNET_GAP;
  });

  const SubnetIcon = isPrivate ? PrivateSubnetIcon : PublicSubnetIcon;
  return (
    <>
      <rect
        x={subnetX}
        y={subnetY}
        style={isPrivate ? styles.privateSubnet : styles.publicSubnet}
        height={subnetHeight}
      />
      <SubnetIcon x={subnetX} y={subnetY} />
      <text
        x={subnetX + 32}
        y={subnetY + 18}
        dominantBaseline="top"
        textAnchor="left"
        style={isPrivate ? styles.privateSubnetText : styles.publicSubnetText}
      >
        {isPrivate ? "Private" : "Public"} Subnet
      </text>
      {subnet.services.length > 0 &&
        layoutServices(subnetX, subnetY, subnet).map(({ x, y, service }) => {
          const Icon = ICONS[service];
          const textX = x + 20;
          const textY = y + 40 + 17;
          return (
            <g key={service}>
              <Icon x={x} y={y} />
              <text
                x={textX}
                y={textY}
                dominantBaseline="top"
                textAnchor="middle"
                style={styles.serviceText}
              >
                {service}
              </text>
            </g>
          );
        })}
      <text
        x={subnetX + SUBNET_WIDTH / 2}
        y={subnetY + subnetHeight - 18}
        dominantBaseline="bottom"
        textAnchor="middle"
        style={styles.ipText}
      >
        {subnet.ip}
      </text>
    </>
  );
};

export default Subnet;
