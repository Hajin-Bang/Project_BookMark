import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { palette } from "../src/design-system/tokens/palette";
import { typography } from "../src/design-system/tokens/typography";
import "../src/design-system/tailwind.css";

const theme = {
  colors: palette,
  typography: typography,
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
