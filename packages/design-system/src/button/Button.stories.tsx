import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["solid", "outline", "ghost", "link"],
      table: {
        type: { summary: "'solid' | 'outline' | 'ghost' | 'link'" },
        defaultValue: { summary: "solid" },
      },
    },
    priority: {
      control: { type: "radio" },
      options: ["default", "important", "dark", "custom"],
      table: {
        type: { summary: "'default' | 'important' | 'dark' | 'custom'" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    full: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    icon: {
      control: { type: "object" },
      table: {
        type: { summary: "ReactNode" },
      },
    },
    as: {
      control: { type: "text" },
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "button" },
      },
    },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"],
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: "button" },
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
          gap: "4px",
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
    children: "Basic Button",
    size: "md",
    variant: "solid",
    priority: "default",
    disabled: false,
    icon: undefined,
    as: "button",
    type: "button",
    full: false,
  },
};

export const Variants = () => (
  <>
    <Button variant="solid">Solid</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </>
);

export const Sizes = () => (
  <>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </>
);

export const Priority = () => (
  <>
    <Button priority="default">Default</Button>
    <Button priority="important">Important</Button>
    <Button priority="dark">Dark</Button>
    <Button priority="custom" className="bg-yellow-400 text-red-600">
      Custom
    </Button>
  </>
);

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    size: "md",
    variant: "solid",
  },
};

export const Full: Story = {
  args: {
    children: "Full Width Button",
    full: true,
    size: "md",
    variant: "solid",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Icon: Story = {
  args: {
    children: "Button With Icon",
    icon: <span>🔍</span>,
  },
};

export const As = () => <Button as="a">Anchor Button</Button>;
