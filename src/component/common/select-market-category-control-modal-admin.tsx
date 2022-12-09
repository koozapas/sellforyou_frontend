import { useMutation } from "@apollo/client";
import { Col, Modal, Row, Button, message, Card } from "antd";
import React, { useEffect, useState } from "react";
import MUTATIONS from "src/apis/mutations";
import CategoriWrapPage from "src/pages/user/product/detail/categori-wrap-page";
import { MutationUpdateManyProductCategoryByAdminArgs } from "src/types";
import { onApolloError } from "src/common/functions";

interface Props {
  visible: boolean;
  closeMarketCategoryControlModal: () => void;
  selectedItemIds?: number[];
}

const SelectMarketCategoryControlModalAdmin = ({
  visible,
  closeMarketCategoryControlModal,
  selectedItemIds,
}: Props) => {
  const [selectCategoryItem, setSelectCategoryItem] = useState<string>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [itemTotal, setItemTotal] = useState<{
    item1: string | undefined;
    item2: string | undefined;
    item3: string | undefined;
    item4: string | undefined;
  }>({
    item1: undefined,
    item2: undefined,
    item3: undefined,
    item4: undefined,
  });
  
  //등록된 세트 정보 쿼리
  const [updateManyProductCategoryByAdmin] = useMutation<
    { updateManyProductCategoryByAdmin: Number },
    MutationUpdateManyProductCategoryByAdminArgs
  >(MUTATIONS.UPDATE_MANY_PRODUCT_CATEGORY_BY_ADMIN);

  const onUpdateManyProductCategoryByAdmin = async () => {
    if (!selectCategoryItem) {
      alert("카테고리를 선택해주세요.");

      return;
    }
    await updateManyProductCategoryByAdmin({
      variables: {
        productIds: selectedItemIds,
        categoryCode: selectCategoryItem,
      },
      refetchQueries: ["SELECT_PRODUCT_LIST_BY_ADMIN"],
    })
      .then(() => {
        message.success("카테고리가 변경되었습니다.");
        closeMarketCategoryControlModal();
      })
      .catch(onApolloError);
  };

  useEffect(() => {
    setSelectCategoryItem("");
  }, [visible]);

  return (
    <Modal
      width="1300px"
      className="user-market-info-modal"
      visible={visible}
      onCancel={() => {
        closeMarketCategoryControlModal();
      }}
      footer={false}
      mask={true}
      transitionName="fade"
      centered
      closable={false}
    >
      <Row style={{ marginBottom: "30px" }}>
        <Col style={{ margin: "0 auto", fontSize: "20px", fontWeight: "bold" }}>
          카테고리 변경

          &nbsp;

          {selectedItemIds?.length !== 0 && `(${selectedItemIds?.length}건)`}
        </Col>
      </Row>
      <Card>
        <CategoriWrapPage
          searchKeyword={searchKeyword}
          selectCategoryItem={selectCategoryItem}
          itemTotal={itemTotal}

          setSearchKeyword={setSearchKeyword}
          setSelectCategoryItem={setSelectCategoryItem}
          setItemTotal={setItemTotal}
        />
      </Card>
      <Button
        type="primary"
        htmlType="submit"
        style={{ display: "flex", margin: "20px auto 0 auto" }}
        onClick={onUpdateManyProductCategoryByAdmin}
      >
        카테고리 저장하기
      </Button>
    </Modal>
  );
};

export default SelectMarketCategoryControlModalAdmin;
