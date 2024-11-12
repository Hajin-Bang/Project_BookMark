import React from 'react'
import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Design System/Label",
  component: Label,
  argTypes: {
    children: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    htmlFor: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Label",
    htmlFor: "input-id",
  },
};
