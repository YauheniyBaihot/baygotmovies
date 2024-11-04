// action font
import {ActionIcon, Button, colorsTuple, createTheme, darken, defaultVariantColorsResolver, lighten, rgba, virtualColor} from '@mantine/core';
import {Poppins} from 'next/font/google';
import localFont from 'next/font/local';

const mainFont = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});
// main font
const headingsFont = localFont({src: '../../public/lavish/Lavish.otf'});

const siteWhite = '#f6f3f3';
const siteBlack = '#0e0d0d';

export const theme = createTheme({
  // /** Put your mantine theme override here */
  colors: {
    'main-color': ['#0d0c0c', '#242323', '#3a3939', '#525050', '#6b6969', '#858383', '#a09e9e', '#bcb9b9', '#d9d6d6', '#f6f3f3'],
    'main-white': colorsTuple(siteWhite),
    'main-black': colorsTuple(siteBlack),
    'transparent-white': colorsTuple(rgba(siteWhite, 0.6)),
    'main-grey': colorsTuple('#7f7f7f'),
    'main-border': colorsTuple('#dadada'),
    'main-white-hover': colorsTuple(darken(siteWhite, 0.1)),
    'main-black-hover': colorsTuple(lighten(siteBlack, 0.1)),
    'main-button': virtualColor({
      name: 'main-button',
      dark: 'main-black',
      light: 'main-white',
    }),
    'main-button-hover': virtualColor({
      name: 'main-button-hover',
      dark: 'main-black-hover',
      light: 'main-white-hover',
    }),
    'main-button-inversed': virtualColor({
      name: 'main-button-inversed',
      light: 'main-black',
      dark: 'main-white',
    }),
    'main-button-inversed-hover': virtualColor({
      name: 'main-button-inversed-hover',
      light: 'main-black-hover',
      dark: 'main-white-hover',
    }),
  },
  defaultRadius: 'xl',
  black: siteBlack,
  white: siteWhite,
  primaryColor: 'main-color',
  fontFamily: mainFont.style.fontFamily,
  headings: {
    fontFamily: headingsFont.style.fontFamily,
    fontWeight: '400',
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'md',
        variant: 'main',
      },
      styles: {
        root: {
          height: 'var(--app-button-height)',
          fontWeight: 400,
        },
      },
    }),
    ActionIcon: ActionIcon.extend({}),
  },
  variantColorResolver: input => {
    if (input.variant === 'main') {
      return {
        background: 'var(--mantine-color-main-button-inversed-0)',
        hover: 'var(--mantine-color-main-button-inversed-hover-0)',
        color: 'var(--mantine-color-main-button-0)',
        border: 'none',
        hoverColor: 'var(--mantine-color-main-button-0)',
      };
    }

    if (input.variant === 'main-inversed') {
      return {
        background: 'var(--mantine-color-main-button-0)',
        hover: 'var(--mantine-color-main-button-hover-0)',
        color: 'var(--mantine-color-main-button-inversed-0)',
        border: 'none',
        hoverColor: 'var(--mantine-color-main-button-inversed-0)',
      };
    }

    return defaultVariantColorsResolver(input);
  },
});
