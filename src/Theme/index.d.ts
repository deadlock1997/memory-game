import { PaletteColor } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    system: {
      primary: PaletteColor["main"];
      secondary: PaletteColor["main"];
      teritiary: PaletteColor["main"];
    };
  }
  interface Palette {
    system: {
      primary: PaletteColor["main"];
      secondary: PaletteColor["main"];
      teritiary: PaletteColor["main"];
    };
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    navLink: {
      active: PaletteColor["main"];
      primary: PaletteColor["main"];
      icon: PaletteColor["main"];
    };
  }
  interface PaletteOptions {
    navLink: {
      active: PaletteColor["main"];
      primary: PaletteColor["main"];
      icon: PaletteColor["main"];
    };
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    LogoBG: {
      bgColor: PaletteColor["main"];
      border: PaletteColor["main"];
    };
  }
  interface PaletteOptions {
    LogoBG: {
      bgColor: PaletteColor["main"];
      border: PaletteColor["main"];
    };
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    dashboard: {
      balance: PaletteColor["main"];
      moneyFlow: PaletteColor["main"];
      debts: PaletteColor["main"];
      recentTransactions: PaletteColor["main"];
      expense: PaletteColor["main"];
      EMIs: PaletteColor["main"];
    };
  }
  interface PaletteOptions {
    dashboard: {
      balance: PaletteColor["main"];
      moneyFlow: PaletteColor["main"];
      debts: PaletteColor["main"];
      recentTransactions: PaletteColor["main"];
      expense: PaletteColor["main"];
      EMIs: PaletteColor["main"];
    };
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    highlight: { main: PaletteColor["main"], text: PaletteColor["main"] };
  }
  interface Palette {
    highlight: { main: PaletteColor["main"], text: PaletteColor["main"] };
  }
}
