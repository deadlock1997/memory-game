import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo, forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { lightPalette } from './light';
import { darkPalette } from './dark';

// eslint-disable-next-line react-refresh/only-export-components
const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    // Map href (Material UI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
  }
);

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    const themeToSet = prefersDarkMode ? 'dark' : 'light';
    return createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 1024,
          lg: 1280,
          xl: 1536,
        },
      },
      typography: {
        fontFamily: '"Press Start 2P"',
      },
      palette: {
        mode: themeToSet,
        ...(themeToSet === 'dark' ? darkPalette : lightPalette),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides(theme) {
            return `
            .MuiChartsTooltip-mark {
              border: 1px solid !important
            }
            *::selection{
              color: ${theme.palette.highlight.text};
              background-color: ${theme.palette.highlight.main};
            }
            :root {
              background-color: ${theme.palette.background.default}
            }
            `;
          },
        },
        MuiLink: {
          defaultProps: {
            component: LinkBehavior,
          } as LinkProps,
        },
        MuiButtonBase: {
          defaultProps: {
            LinkComponent: LinkBehavior,
          },
        },
        MuiAppBar: {
          defaultProps: {
            sx: { minHeight: '70px' },
          },
        },
        MuiTypography: {
          defaultProps: {
            color: 'text.primary',
          },
        },
      },
    });
  }, [prefersDarkMode]);
  return { theme };
};
