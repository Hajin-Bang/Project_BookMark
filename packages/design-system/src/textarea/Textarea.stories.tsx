import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Design System/Textarea",
  component: Textarea,
  argTypes: {
    resize: {
      control: { type: "radio" },
      options: ["none", "vertical", "horizontal", "both"],
      table: {
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: "both" },
      },
    },
    appearance: {
      control: { type: "radio" },
      options: ["standard", "none"],
      table: {
        type: { summary: "'standard' | 'none'" },
        defaultValue: { summary: "standard" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "1em",
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
  args: {
    resize: "both",
    appearance: "standard",
    disabled: false,
    error: "",
    label: "Description",
    className: "",
    placeholder: "Enter text here...",
  },
};

export const Resize = () => (
  <>
    <Textarea resize="none" label="No Resize" placeholder="Cannot resize" />
    <Textarea
      resize="vertical"
      label="Vertical Resize"
      placeholder="Resize vertically"
    />
    <Textarea
      resize="horizontal"
      label="Horizontal Resize"
      placeholder="Resize horizontally"
    />
    <Textarea
      resize="both"
      label="Both Resize"
      placeholder="Resize in both directions"
    />
  </>
);

export const Appearance = () => (
  <>
    <Textarea
      appearance="standard"
      label="Standard Appearance"
      placeholder="Standard bordered textarea"
    />
    <Textarea
      appearance="none"
      label="No Border"
      placeholder="Textarea without border"
    />
  </>
);

export const Error = () => (
  <>
    <Textarea
      label="Textarea with Error"
      error="This is an error message"
      placeholder="Error state"
    />
  </>
);

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    disabled: true,
    placeholder: "This textarea is disabled",
  },
};
