import React from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ModalControlProps } from "@/types/ModalTypes";
import Modal from "@design-system/modal/components/Modal";
import { useNavigate } from "react-router-dom";

const LogoutModal: React.FC<ModalControlProps> = ({ open, onOpenChange }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title>로그아웃 확인</Modal.Title>
        <Modal.Description>정말 로그아웃 하시겠습니까?</Modal.Description>
        <Modal.Actions>
          <Modal.Cancel onOpenChange={onOpenChange}>취소</Modal.Cancel>
          <Modal.Action onClick={handleLogout}>확인</Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
