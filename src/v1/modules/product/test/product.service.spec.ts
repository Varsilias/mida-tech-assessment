import * as ProductService from "../product.service";
import { ProductRepository } from "../repositories/product.repository";

describe("ProductService", () => {
  describe("createNewProduct", () => {
    const spy = jest.spyOn(ProductService, "createNewProduct");
    const returnValue = {
      status: false,
      message: "Product already exists, choose a different name",
      statusCode: 429,
    };

    beforeEach(() => {
      ProductRepository.findOne = jest.fn().mockResolvedValue({
        product_name: "Product 3",
        product_description: "Product description 3",
        product_price: 1500,
        id: 3,
        public_id: "71d79ee3-ec31-4ab7-ac5b-41ceb3ab7d5b",
        created_at: "2024-07-17T14:38:06.562Z",
        updated_at: "2024-07-17T14:38:06.562Z",
        deleted_at: null,
      });

      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return a conflict status code for duplicate product name", async () => {
      const payload = {
        product_name: "Product 3",
        product_description: "Product description 3",
        product_price: 1500,
      };

      await expect(ProductService.createNewProduct(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("createNewProduct", () => {
    const spy = jest.spyOn(ProductService, "createNewProduct");
    const returnValue = {
      status: true,
      statusCode: 200,
      message: "Product created successfully",
      data: {
        product_name: "Product 3",
        product_description: "Product description 3",
        product_price: 1500,
        id: 3,
        public_id: "71d79ee3-ec31-4ab7-ac5b-41ceb3ab7d5b",
        created_at: new Date("2024-07-17T14:38:06.562Z"),
        updated_at: new Date("2024-07-17T14:38:06.562Z"),
        deleted_at: null,
        orders: [],
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return create new product successfully", async () => {
      const payload = {
        product_name: "Product 3",
        product_description: "Product description 3",
        product_price: 1500,
      };

      const promise = ProductService.createNewProduct(payload);

      await expect(promise).resolves.toHaveProperty("statusCode", 200);
      await expect(promise).resolves.toHaveProperty("status", true);
      await expect(promise).resolves.toHaveProperty("message", "Product created successfully");

      await expect(promise).resolves.toHaveProperty("data", {
        product_name: "Product 3",
        product_description: "Product description 3",
        product_price: 1500,
        id: 3,
        public_id: "71d79ee3-ec31-4ab7-ac5b-41ceb3ab7d5b",
        created_at: new Date("2024-07-17T14:38:06.562Z"),
        updated_at: new Date("2024-07-17T14:38:06.562Z"),
        deleted_at: null,
        orders: [],
      });
    });
  });

  describe("getProducts", () => {
    const spy = jest.spyOn(ProductService, "getProducts");

    const returnValue = {
      status: true,
      message: "Product retrieved successfully",
      statusCode: 200,
      data: {
        page: 1,
        perPage: 10,
        totalPages: 1,
        totalRecords: 3,
        data: [],
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return an empty array of if page is greater than total pages", async () => {
      const payload = {
        page: 4,
        perPage: 10,
      };

      const promise = ProductService.getProducts(payload);
      await expect(promise).resolves.toHaveProperty("statusCode", 200);
      await expect(promise).resolves.toHaveProperty("status", true);
      await expect(promise).resolves.toHaveProperty("message", "Product retrieved successfully");
      await expect(promise).resolves.toHaveProperty("data", {
        page: 1,
        perPage: 10,
        totalPages: 1,
        totalRecords: 3,
        data: [],
      });
    });
  });

  describe("getProducts", () => {
    const spy = jest.spyOn(ProductService, "getProducts");

    const returnValue = {
      status: true,
      message: "Product retrieved successfully",
      statusCode: 200,
      data: {
        page: 1,
        perPage: 10,
        totalPages: 1,
        totalRecords: 3,
        data: [
          {
            id: 3,
            public_id: "71d79ee3-ec31-4ab7-ac5b-41ceb3ab7d5b",
            created_at: new Date("2024-07-17T14:38:06.562Z"),
            updated_at: new Date("2024-07-17T14:38:06.562Z"),
            deleted_at: null,
            product_name: "Product 3",
            product_description: "Product description 3",
            product_price: 1500.0,
            orders: [],
          },
          {
            id: 2,
            public_id: "81e651d0-b4b7-4d5c-a1ae-8ab8b80122db",
            created_at: new Date("2024-07-17T13:11:22.223Z"),
            updated_at: new Date("2024-07-17T13:11:22.223Z"),
            deleted_at: null,
            product_name: "Product 2",
            product_description: "Product description 2",
            product_price: 1200.0,
            orders: [],
          },
          {
            id: 1,
            public_id: "828188cc-6820-4f54-9be8-d6e005784d99",
            created_at: new Date("2024-07-17T13:11:06.484Z"),
            updated_at: new Date("2024-07-17T13:11:06.484Z"),
            deleted_at: null,
            product_name: "Product 1",
            product_description: "Product description 1",
            product_price: 1200.0,
            orders: [],
          },
        ],
      },
    };

    beforeEach(() => {
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return an array of products with pagination value pointers", async () => {
      const payload = {
        page: 1,
        perPage: 10,
      };

      const promise = ProductService.getProducts(payload);
      await expect(promise).resolves.toHaveProperty("statusCode", 200);
      await expect(promise).resolves.toHaveProperty("status", true);
      await expect(promise).resolves.toHaveProperty("message", "Product retrieved successfully");
      await expect(promise).resolves.toHaveProperty("data", {
        page: 1,
        perPage: 10,
        totalPages: 1,
        totalRecords: 3,
        data: [
          {
            id: 3,
            public_id: "71d79ee3-ec31-4ab7-ac5b-41ceb3ab7d5b",
            created_at: new Date("2024-07-17T14:38:06.562Z"),
            updated_at: new Date("2024-07-17T14:38:06.562Z"),
            deleted_at: null,
            product_name: "Product 3",
            product_description: "Product description 3",
            product_price: 1500.0,
            orders: [],
          },
          {
            id: 2,
            public_id: "81e651d0-b4b7-4d5c-a1ae-8ab8b80122db",
            created_at: new Date("2024-07-17T13:11:22.223Z"),
            updated_at: new Date("2024-07-17T13:11:22.223Z"),
            deleted_at: null,
            product_name: "Product 2",
            product_description: "Product description 2",
            product_price: 1200.0,
            orders: [],
          },
          {
            id: 1,
            public_id: "828188cc-6820-4f54-9be8-d6e005784d99",
            created_at: new Date("2024-07-17T13:11:06.484Z"),
            updated_at: new Date("2024-07-17T13:11:06.484Z"),
            deleted_at: null,
            product_name: "Product 1",
            product_description: "Product description 1",
            product_price: 1200.0,
            orders: [],
          },
        ],
      });
    });
  });
});
