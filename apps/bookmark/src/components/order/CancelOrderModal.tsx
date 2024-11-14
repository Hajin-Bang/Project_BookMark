import { useCancelOrder } from "@/lib/order/hooks/useCancelOrder";
import { ModalControlProps } from "@/types/ModalTypes";
import Modal from "@design-system/modal/components/Modal";
import React from "react";

interface CancelOrderModalProps extends ModalControlProps {
  onConfirmCancel: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  open,
  onOpenChange,
  onConfirmCancel,
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Title>주문 취소 확인</Modal.Title>
        <Modal.Description>
          정말로 주문을 취소하시겠습니까? <br /> 취소한 주문은 복구할 수
          없습니다.
        </Modal.Description>
        <Modal.Actions>
          <Modal.Cancel priority="important" onOpenChange={onOpenChange}>
            취소
          </Modal.Cancel>
          <Modal.Action priority="important" onClick={onConfirmCancel}>
            확인
          </Modal.Action>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default CancelOrderModal;
