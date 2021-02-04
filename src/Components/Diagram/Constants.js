export const AZ_WIDTH = 200;
export const AZ_MARGIN = 30;
export const AZ_OFFSET = AZ_WIDTH + AZ_MARGIN;

export const SUBNET_WIDTH = 170;
export const SUBNET_HEIGHT = 120;
export const SUBNET_MARGIN = 16 + AZ_MARGIN;
export const SUBNET_GAP = 16;

export const SERVICE_MARGIN_Y = 38;
export const SERVICE_MARGIN_X = 32;
export const SERVICE_HEIGHT = 40;
export const SERVICE_WIDTH = 40;
export const SERVICE_GAP = 26;

import { ReactComponent as EC2Icon } from "../../Assets/Icons/EC2.svg";
import { ReactComponent as GuardDutyIcon } from "../../Assets/Icons/GuardDuty.svg";
import { ReactComponent as IAMIcon } from "../../Assets/Icons/IAM.svg";
import { ReactComponent as InspectorIcon } from "../../Assets/Icons/Inspector.svg";
import { ReactComponent as KMSIcon } from "../../Assets/Icons/KMS.svg";
import { ReactComponent as LambdaIcon } from "../../Assets/Icons/Lambda.svg";
import { ReactComponent as NATGatewayIcon } from "../../Assets/Icons/NATGateway.svg";
import { ReactComponent as S3Icon } from "../../Assets/Icons/S3.svg";

export const ICONS = {
  EC2: EC2Icon,
  GuardDuty: GuardDutyIcon,
  IAM: IAMIcon,
  Inspector: InspectorIcon,
  KMS: KMSIcon,
  Lambda: LambdaIcon,
  NATGateway: NATGatewayIcon,
  S3: S3Icon,
};
