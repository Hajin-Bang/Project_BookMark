import React from 'react'
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./components/Card";
import { CardContent } from "./components/CardContent";
import { CardTitle } from "./components/CardTitle";

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["row", "column"],
      table: {
        type: { summary: "'row' | 'column'" },
        defaultValue: { summary: "column" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    direction: "column",
  },
  render: ({ direction }) => (
    <Card direction={direction}>
      <CardTitle>Basic Card</CardTitle>
      <CardContent>This is a basic card with title and content.</CardContent>
    </Card>
  ),
};

export const Direction: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card direction="column">
        <CardTitle>Column Layout</CardTitle>
        <CardContent>This content is displayed in a column layout.</CardContent>
      </Card>
      <Card direction="row">
        <CardTitle>Row Layout</CardTitle>
        <CardContent>
          <p>Content 1: Card Content 1</p>
          <p>Content 2: Card Content 2</p>
          <p>Content 3: Card Content 3</p>
        </CardContent>
      </Card>
    </div>
  ),
};
