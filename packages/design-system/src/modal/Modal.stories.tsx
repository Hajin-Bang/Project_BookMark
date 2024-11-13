import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModalProvider } from "./ModalContext";
import Modal from "./components/Modal";
import Button from "../button/Button";

const meta: Meta = {
  title: "Design System/Modal",
  component: Modal,
  argTypes: {
    open: {
      description: "제어 모드에서 모달의 열림 상태를 설정합니다.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "제어 모드에서 모달의 상태가 변경될 때 호출되는 함수입니다.",
      table: {
        type: { summary: "function" },
      },
    },
    onClick: {
      action: "onClick",
      description: "Modal.Action 버튼 클릭 시 호출되는 함수입니다.",
      table: {
        type: { summary: "function" },
      },
    },
  },
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
        <Modal.Actions>
          <Modal.Cancel>Cancel</Modal.Cancel>
          <Modal.Action onClick={() => alert("Confirmed")}>
            Confirm
          </Modal.Action>
        </Modal.Actions>
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
        <Modal.Actions>
          <Modal.Cancel>Confirm</Modal.Cancel>
        </Modal.Actions>
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
        <Modal.Actions>
          <Modal.Cancel priority="important">Back</Modal.Cancel>
          <Modal.Action
            priority="important"
            onClick={() => alert("Proceeding")}
          >
            Proceed
          </Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  ),
};

export const ControlledModal: Story = {
  render: () => {
    const [isModalOpen, setModalOpen] = React.useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleClickModal = () => {
      alert("confirmed");
      closeModal();
    };

    return (
      <>
        <Button onClick={openModal}>Open Controlled Modal</Button>
        <Modal open={isModalOpen} onOpenChange={setModalOpen}>
          <Modal.Content>
            <Modal.Title>Controlled Modal Title</Modal.Title>
            <Modal.Description>Description</Modal.Description>
            <Modal.Actions>
              <Modal.Cancel onOpenChange={closeModal}>Cancel</Modal.Cancel>
              <Modal.Action onClick={handleClickModal}>Confirm</Modal.Action>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
