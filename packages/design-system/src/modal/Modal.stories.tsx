import type { Meta, StoryObj } from "@storybook/react";
import { ModalProvider } from "./ModalContext";
import Modal from "./components/Modal";

const meta: Meta = {
  title: "Design System/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "4px",
          height: "30vh",
          width: "100vw",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalProvider>
          <Story />
        </ModalProvider>
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Modal Title</Modal.Title>
        <Modal.Description>
          This is a description of the modal content.
        </Modal.Description>
        <div className="flex justify-center gap-2">
          <Modal.Cancel>Cancel</Modal.Cancel>
          <Modal.Action onClick={() => alert("Confirmed")}>
            Confirm
          </Modal.Action>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

export const CancelOnly: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>Open Cancel Only Modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Single Action Modal</Modal.Title>
        <Modal.Description>
          This modal has only a Cancel button to close it.
        </Modal.Description>
        <Modal.Cancel>Confirm</Modal.Cancel>
      </Modal.Content>
    </Modal>
  ),
};

export const CustomPriority: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>Open Custom Priority Modal</Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Custom Priority</Modal.Title>
        <Modal.Description>
          This modal demonstrates different priority levels for Button.
        </Modal.Description>
        <div className="flex justify-center gap-2">
          <Modal.Cancel priority="important">Back</Modal.Cancel>
          <Modal.Action
            priority="important"
            onClick={() => alert("Proceeding")}
          >
            Proceed
          </Modal.Action>
        </div>
      </Modal.Content>
    </Modal>
  ),
};
