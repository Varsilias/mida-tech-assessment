export interface IProductDto {
  product_name: string;
  product_description: string;
  product_price: number;
}

export interface IGetProductsDto {
  page: number;
  perPage: number;
}
