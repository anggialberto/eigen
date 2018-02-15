/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type QueryRenderersConversationQueryVariables = {
    readonly conversationID: string;
};
export type QueryRenderersConversationQueryResponse = {
    readonly me: ({
    }) | null;
};



/*
query QueryRenderersConversationQuery(
  $conversationID: String!
) {
  me {
    ...Conversation_me
    __id
  }
}

fragment Conversation_me on Me {
  conversation(id: $conversationID) {
    id
    __id
    to {
      name
      initials
    }
    from {
      email
    }
    last_message_id
    ...Messages_conversation
    initial_message
    unread
  }
  __id
}

fragment Messages_conversation on Conversation {
  __id
  id
  from {
    name
    email
    initials
  }
  to {
    name
    initials
  }
  initial_message
  messages(first: 10, sort: DESC) {
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      cursor
      node {
        __id
        impulse_id
        is_from_user
        body
        attachments {
          id
        }
        ...Message_message
        __typename
      }
    }
  }
  items {
    artwork: item {
      __typename
      ... on Artwork {
        href
        ...ArtworkPreview_artwork
      }
      ... on Node {
        __id
      }
    }
    show: item {
      __typename
      ... on Show {
        href
        ...ShowPreview_show
      }
      ... on Node {
        __id
      }
    }
  }
}

fragment Message_message on Message {
  body
  created_at
  is_from_user
  from {
    name
    email
  }
  invoice {
    payment_url
    ...InvoicePreview_invoice
    __id
  }
  attachments {
    id
    content_type
    download_url
    file_name
    ...ImagePreview_attachment
    ...PDFPreview_attachment
  }
  __id
}

fragment ArtworkPreview_artwork on Artwork {
  id
  _id
  title
  artist_names
  date
  image {
    url
  }
  __id
}

fragment ShowPreview_show on Show {
  id
  _id
  name
  cover_image {
    url
  }
  fair {
    name
    __id
  }
  partner {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      __id
    }
    ... on ExternalPartner {
      __id
    }
  }
  __id
}

fragment InvoicePreview_invoice on Invoice {
  payment_url
  state
  total
  lewitt_invoice_id
  __id
}

fragment ImagePreview_attachment on Attachment {
  download_url
  ...AttachmentPreview_attachment
}

fragment PDFPreview_attachment on Attachment {
  file_name
  ...AttachmentPreview_attachment
}

fragment AttachmentPreview_attachment on Attachment {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "conversationID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "QueryRenderersConversationQuery",
  "id": null,
  "text": "query QueryRenderersConversationQuery(\n  $conversationID: String!\n) {\n  me {\n    ...Conversation_me\n    __id\n  }\n}\n\nfragment Conversation_me on Me {\n  conversation(id: $conversationID) {\n    id\n    __id\n    to {\n      name\n      initials\n    }\n    from {\n      email\n    }\n    last_message_id\n    ...Messages_conversation\n    initial_message\n    unread\n  }\n  __id\n}\n\nfragment Messages_conversation on Conversation {\n  __id\n  id\n  from {\n    name\n    email\n    initials\n  }\n  to {\n    name\n    initials\n  }\n  initial_message\n  messages(first: 10, sort: DESC) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasPreviousPage\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        __id\n        impulse_id\n        is_from_user\n        body\n        attachments {\n          id\n        }\n        ...Message_message\n        __typename\n      }\n    }\n  }\n  items {\n    artwork: item {\n      __typename\n      ... on Artwork {\n        href\n        ...ArtworkPreview_artwork\n      }\n      ... on Node {\n        __id\n      }\n    }\n    show: item {\n      __typename\n      ... on Show {\n        href\n        ...ShowPreview_show\n      }\n      ... on Node {\n        __id\n      }\n    }\n  }\n}\n\nfragment Message_message on Message {\n  body\n  created_at\n  is_from_user\n  from {\n    name\n    email\n  }\n  invoice {\n    payment_url\n    ...InvoicePreview_invoice\n    __id\n  }\n  attachments {\n    id\n    content_type\n    download_url\n    file_name\n    ...ImagePreview_attachment\n    ...PDFPreview_attachment\n  }\n  __id\n}\n\nfragment ArtworkPreview_artwork on Artwork {\n  id\n  _id\n  title\n  artist_names\n  date\n  image {\n    url\n  }\n  __id\n}\n\nfragment ShowPreview_show on Show {\n  id\n  _id\n  name\n  cover_image {\n    url\n  }\n  fair {\n    name\n    __id\n  }\n  partner {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __id\n    }\n    ... on ExternalPartner {\n      __id\n    }\n  }\n  __id\n}\n\nfragment InvoicePreview_invoice on Invoice {\n  payment_url\n  state\n  total\n  lewitt_invoice_id\n  __id\n}\n\nfragment ImagePreview_attachment on Attachment {\n  download_url\n  ...AttachmentPreview_attachment\n}\n\nfragment PDFPreview_attachment on Attachment {\n  file_name\n  ...AttachmentPreview_attachment\n}\n\nfragment AttachmentPreview_attachment on Attachment {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "QueryRenderersConversationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Conversation_me",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "QueryRenderersConversationQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conversation",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "conversationID",
                "type": "String!"
              }
            ],
            "concreteType": "Conversation",
            "plural": false,
            "selections": [
              v2,
              v1,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "to",
                "storageKey": null,
                "args": null,
                "concreteType": "ConversationResponder",
                "plural": false,
                "selections": [
                  v3,
                  v4
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "from",
                "storageKey": null,
                "args": null,
                "concreteType": "ConversationInitiator",
                "plural": false,
                "selections": [
                  v5,
                  v3,
                  v4
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "last_message_id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "initial_message",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "messages",
                "storageKey": "messages(first:10,sort:\"DESC\")",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "DESC",
                    "type": "sort"
                  }
                ],
                "concreteType": "MessageConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "startCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasPreviousPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "MessageEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Message",
                        "plural": false,
                        "selections": [
                          v1,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "impulse_id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_from_user",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "body",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "attachments",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Attachment",
                            "plural": true,
                            "selections": [
                              v2,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "content_type",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "download_url",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "file_name",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "created_at",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "from",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "MessageInitiator",
                            "plural": false,
                            "selections": [
                              v3,
                              v5
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "invoice",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Invoice",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "payment_url",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "state",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "total",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "lewitt_invoice_id",
                                "args": null,
                                "storageKey": null
                              },
                              v1
                            ]
                          },
                          v6
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "messages",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "sort",
                    "value": "DESC",
                    "type": "sort"
                  }
                ],
                "handle": "connection",
                "key": "Messages_messages",
                "filters": []
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "items",
                "storageKey": null,
                "args": null,
                "concreteType": "ConversationItem",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": "artwork",
                    "name": "item",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      v6,
                      v1,
                      {
                        "kind": "InlineFragment",
                        "type": "Artwork",
                        "selections": [
                          v7,
                          v2,
                          v8,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artist_names",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": v9
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "show",
                    "name": "item",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      v6,
                      v1,
                      {
                        "kind": "InlineFragment",
                        "type": "Show",
                        "selections": [
                          v7,
                          v2,
                          v8,
                          v3,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "cover_image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": v9
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "fair",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Fair",
                            "plural": false,
                            "selections": [
                              v3,
                              v1
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": null,
                            "args": null,
                            "concreteType": null,
                            "plural": false,
                            "selections": [
                              v6,
                              v1,
                              {
                                "kind": "InlineFragment",
                                "type": "Partner",
                                "selections": [
                                  v3
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "unread",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'fe5889d5a36fd2a36e81e4d6f595a8b1';
export default node;
