import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { palette } from "../packages/design-system/src/tokens/palette";
import { typography } from "../packages/design-system/src/tokens/typography";
import "../packages/design-system/src/tailwind.css";

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
