import React from 'react'
import type { Meta, StoryObj } from "@storybook/react";
import Select from "./components/Select";

const meta: Meta<typeof Select> = {
  title: "Design System/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "4px",
          height: "30vh",
          width: "100%",
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
  render: () => (
    <Select className="w-[300px]">
      <Select.Trigger placeholder="카테고리 선택" />
      <Select.Content>
        <Select.Option value="option1">option 1</Select.Option>
        <Select.Option value="option2">option 2</Select.Option>
        <Select.Option value="option3">option 3</Select.Option>
      </Select.Content>
    </Select>
  ),
};
