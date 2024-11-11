import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../button/Button";
import { ToastProvider, useToast } from "./ToastContext";
import { Toast } from "./components/Toast";

const meta: Meta<typeof Toast> = {
  title: "Design System/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["success", "error", "info"],
      table: {
        type: { summary: "'success' | 'error' | 'info'" },
        defaultValue: { summary: "success" },
      },
    },
    duration: {
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "3000" },
      },
    },
    title: {
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            width: "100vw",
            height: "20vh",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: "Toast message",
    variant: "success",
    duration: 3000,
  },
  render: ({ title, variant, duration }) => (
    <ToastButton title={title} variant={variant} duration={duration}>
      Open toast
    </ToastButton>
  ),
};

export const Variants: Story = {
  render: () => (
    <>
      <ToastButton title="Success message" variant="success">
        Open success toast
      </ToastButton>
      <ToastButton title="Error message" variant="error">
        Open error toast
      </ToastButton>
      <ToastButton title="Info message" variant="info">
        Open info toast
      </ToastButton>
    </>
  ),
};

export const Durations: Story = {
  render: () => (
    <>
      <ToastButton title="Toast message" duration={1000}>
        Open 1s toast
      </ToastButton>
      <ToastButton title="Toast message" duration={3000}>
        Open 3s toast
      </ToastButton>
      <ToastButton title="Toast message" duration={5000}>
        Open 5s toast
      </ToastButton>
    </>
  ),
};

const ToastButton: React.FC<{
  title: string;
  variant?: "success" | "error" | "info";
  duration?: number;
  children: React.ReactNode;
}> = ({ title, variant = "success", duration = 3000, children }) => {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() =>
        addToast({
          title,
          variant,
          duration,
        })
      }
    >
      {children}
    </Button>
  );
};
