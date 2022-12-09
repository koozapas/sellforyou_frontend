import { gql } from "@apollo/client";

const SUBSCRIPTIONS = {
  PRODUCT_COLLECTION_SUBSCRIPTION: gql`
    subscription {
      subscribeUserEvent {
        id
        userId
        title
        payloadData
        isRead
      }
    }
  `,

};

export default SUBSCRIPTIONS;
