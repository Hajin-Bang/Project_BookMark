import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "primary", "secondary", "accent"],
      table: {
        type: { summary: "'default' | 'primary' | 'secondary' | 'accent'" },
        defaultValue: { summary: "default" },
      },
    },
    appearance: {
      control: { type: "radio" },
      options: ["solid", "outline"],
      table: {
        type: { summary: "'solid' | 'outline'" },
        defaultValue: { summary: "solid" },
      },
    },
    shape: {
      control: { type: "radio" },
      options: ["pill", "rounded"],
      table: {
        type: { summary: "'pill' | 'rounded'" },
        defaultValue: { summary: "pill" },
      },
    },
    children: {
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
          gap: "8px",
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
    children: "Badge",
    variant: "default",
    appearance: "solid",
    shape: "pill",
  },
};

export const Variant = () => (
  <>
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="accent">Accent</Badge>
  </>
);

export const Appearance = () => (
  <>
    <Badge appearance="solid">Solid default</Badge>
    <Badge appearance="outline">Outline default</Badge>
    <Badge appearance="solid" variant="secondary">
      Solid Secondary
    </Badge>
    <Badge appearance="outline" variant="secondary">
      Outline Secondary
    </Badge>
  </>
);

export const Shape = () => (
  <>
    <Badge shape="pill">Pill Shape</Badge>
    <Badge shape="rounded">Rounded Shape</Badge>
  </>
);
