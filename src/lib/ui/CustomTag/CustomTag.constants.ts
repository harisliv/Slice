import type { Theme } from "@app/lib/general";
import {
  CheckCircleIcon,
  CheckedIcon,
  EditIcon,
  StarIcon,
  StatusLockIcon,
} from "@app/lib/icons";
import type { IIconProps, TagStatus } from "@app/lib/types";

export const getCustomTagVariant = (
  variant: TagStatus,
): {
  backgroundColor: keyof (typeof Theme)["palette"]["secondary"];
  textColor: string;
  Icon: React.FC<IIconProps>;
  label: string;
} => {
  switch (variant) {
    case "SUBMITTED":
      return {
        backgroundColor: "lightGreen",
        textColor: "#FFFFFF",
        Icon: CheckedIcon,
        label: "Submitted",
      };
    case "DRAFT":
      return {
        backgroundColor: "warningOrange",
        textColor: "#FFFFFF",
        Icon: EditIcon,
        label: "Draft",
      };
    case "CONCLUDED":
      return {
        backgroundColor: "successGreen",
        textColor: "#FFFFFF",
        Icon: CheckCircleIcon,
        label: "Concluded",
      };
    case "ACTIVE":
      return {
        backgroundColor: "informationBlue",
        textColor: "#FFFFFF",
        Icon: StarIcon,
        label: "Active",
      };
    case "ACCOMPLISHED":
      return {
        backgroundColor: "informationBlue20",
        textColor: "#424245",
        Icon: StatusLockIcon,
        label: "Accomplished",
      };
    case "INACTIVE":
      return {
        backgroundColor: "darkerGrey36",
        textColor: "#424245",
        Icon: StatusLockIcon,
        label: "Inactive",
      };
    default:
      return {
        backgroundColor: "darkerGrey36",
        textColor: "#424245",
        Icon: StatusLockIcon,
        label: "Unknown",
      };
  }
};
