import PetsIcon from "@mui/icons-material/Pets";
import BugReportIcon from "@mui/icons-material/BugReport";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import WindowIcon from "@mui/icons-material/Window";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import YardIcon from "@mui/icons-material/Yard";
import BuildIcon from "@mui/icons-material/Build";
import DeckIcon from "@mui/icons-material/Deck";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ForestIcon from "@mui/icons-material/Forest";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import { useTheme } from "@mui/material";

export const ImageGenerator = ({ index }: { index: number }) => {
  const theme = useTheme();
  const icons = [
    PetsIcon,
    BugReportIcon,
    BedIcon,
    WeekendIcon,
    WindowIcon,
    OutdoorGrillIcon,
    YardIcon,
    BuildIcon,
    DeckIcon,
    LocalFireDepartmentIcon,
    BathtubIcon,
    ForestIcon,
    WbSunnyIcon,
    BeachAccessIcon,
    WbTwilightIcon,
  ];

  const Icon = icons[index];

  return <Icon sx={{ color: theme.palette.text.primary }} />;
};
