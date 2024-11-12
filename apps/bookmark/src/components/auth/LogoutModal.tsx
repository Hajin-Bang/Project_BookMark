import { useAuthStore } from "@/store/auth/useAuthStore";
import Modal from "@design-system/modal/components/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutModal: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <Modal>
      <Modal.Content>
        <Modal.Title>로그아웃 확인</Modal.Title>
        <Modal.Description>정말 로그아웃 하시겠습니까?</Modal.Description>
        <div className="flex justify-center gap-2">
          <Modal.Cancel>취소</Modal.Cancel>
          <Modal.Action onClick={handleLogout}>확인</Modal.Action>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
