export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<CommerceCart, "lines"> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = CommerceCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<CommerceProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type CommerceCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type CommerceCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type CommerceProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type CommerceCartOperation = {
  data: {
    cart: CommerceCart;
  };
  variables: {
    cartId: string;
  };
};

export type CommerceCreateCartOperation = {
  data: { cartCreate: { cart: CommerceCart } };
};

export type CommerceAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: CommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type CommerceRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: CommerceCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type CommerceUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: CommerceCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type CommerceCollectionOperation = {
  data: {
    collection: CommerceCollection;
  };
  variables: {
    handle: string;
  };
};

export type CommerceCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<CommerceProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type CommerceCollectionsOperation = {
  data: {
    collections: Connection<CommerceCollection>;
  };
};

export type CommerceMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type CommercePageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type CommercePagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type CommerceProductOperation = {
  data: { product: CommerceProduct };
  variables: {
    handle: string;
  };
};

export type CommerceProductRecommendationsOperation = {
  data: {
    productRecommendations: CommerceProduct[];
  };
  variables: {
    productId: string;
  };
};

export type CommerceProductsOperation = {
  data: {
    products: Connection<CommerceProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
