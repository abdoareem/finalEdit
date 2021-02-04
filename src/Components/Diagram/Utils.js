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

/* Calculates the height of a given subnet */
export const getSubnetHeight = (subnet) => {
  const rows = Math.ceil(subnet.services.length / 2);
  let height = rows * (SERVICE_HEIGHT + SERVICE_GAP) + SERVICE_MARGIN_Y;
  if (subnet.ip) {
    height += 36;
  } else {
    height += 20;
  }
  return height;
};
