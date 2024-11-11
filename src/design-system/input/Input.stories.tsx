import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: { type: "object" },
      table: {
        type: { summary: "ReactNode" },
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
    full: {
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
    size: "md",
    disabled: false,
    icon: undefined,
    error: "",
    label: "Label",
    full: false,
    className: "",
    placeholder: "값을 입력해주세요.",
  },
};

export const Sizes = () => (
  <>
    <Input size="sm" label="Small Input" placeholder="Small Input" />
    <Input size="md" label="Medium Input" placeholder="Medium Input" />
    <Input size="lg" label="Large Input" placeholder="Large Input" />
    <Input size="xl" label="Extra Large Input" placeholder="Extra Input" />
  </>
);

export const Error: Story = {
  args: {
    label: "Input with Error",
    error: "This is an error message",
    placeholder: "값을 입력해주세요.",
  },
};

export const Icon: Story = {
  args: {
    label: "Input with Icon",
    icon: <span>🔍</span>,
    placeholder: "값을 입력해주세요.",
  },
};

// 비활성화된 Input
export const Disabled: Story = {
  args: {
    label: "Input with Disabled",
    disabled: true,
    placeholder: "값을 입력해주세요.",
  },
};

// 전체 너비 적용
export const Full: Story = {
  args: {
    label: "Full Width Input",
    full: true,
    placeholder: "값을 입력해주세요.",
  },
};
