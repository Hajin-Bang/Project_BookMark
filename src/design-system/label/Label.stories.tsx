import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta: Meta<typeof Label> = {
  title: "Design System/Label",
  component: Label,
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Label text content",
      defaultValue: "Label",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Label" },
      },
    },
    htmlFor: {
      control: { type: "text" },
      description:
        "Specifies the ID of the input element associated with the label",
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Label",
  },
};
