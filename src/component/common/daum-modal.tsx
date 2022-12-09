import React from "react";
import { Modal } from "antd";
import DaumPostCode from "react-daum-postcode";

type AddressData = {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: "R" | "J";
  userSelectedType: "R" | "J";
  userLanguageType: "K" | "E";
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: "Y" | "N";
  sido: string;
  sigungu: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  bname: string;
  bname1: string;
  bname2: string;
  hname: string;
  query: string;
  noSelected: "Y" | "N";
};

interface Props {
  visible: boolean;
  closeDaumModal: () => void;
  onClickAddress: (addressData: AddressData) => void;
}

const DaumModal = ({ visible, closeDaumModal, onClickAddress }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={closeDaumModal}
      footer={false}
      closable={false}
      transitionName=""
      centered
      width={"auto"}
      className="daum-modal"
    >
      <DaumPostCode onComplete={onClickAddress} />
    </Modal>
  );
};

export default DaumModal;
