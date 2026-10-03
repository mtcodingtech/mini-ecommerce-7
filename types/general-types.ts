export type CategoryType = {
    name: string;
    slug: string
}

export type ProductType = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
}

export type CartItemType = {
    product: ProductType;
    quantity: number;
}