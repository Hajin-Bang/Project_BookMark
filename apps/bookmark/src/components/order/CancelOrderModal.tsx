import { useCancelOrder } from "@/lib/order/hooks/useCancelOrder";
import Modal from "@design-system/modal/components/Modal";
import React from "react";

interface CancelOrderModalProps {
  cancelOrder: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ cancelOrder }) => {
  return (
    <Modal>
      <Modal.Content>
        <Modal.Title>주문 취소 확인</Modal.Title>
        <Modal.Description>
          정말로 주문을 취소하시겠습니까? <br /> 취소한 주문은 복구할 수
          없습니다.
        </Modal.Description>
        <div className="flex justify-center gap-2">
          <Modal.Cancel priority="important">취소</Modal.Cancel>
          <Modal.Action priority="important" onClick={cancelOrder}>
            확인
          </Modal.Action>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CancelOrderModal;
