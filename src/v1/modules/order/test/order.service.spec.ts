import * as OrderService from "../order.service";
import { UserRepository } from "../../auth/_user/user.repository";
import { ProductRepository } from "../../product/repositories/product.repository";
import { OrderEntity } from "../entities/order.entity";

describe("OrderService", () => {
  describe("createNewOrder", () => {
    const spy = jest.spyOn(OrderService, "createNewOrder");
    const returnValue = {
      status: false,
      message: "User not found",
      statusCode: 404,
    };

    beforeEach(() => {
      UserRepository.findOne = jest.fn().mockResolvedValue(null);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'user not found' if wrong user ID is provided", async () => {
      const payload = {
        user_id: Number.NaN,
        product_id: Number.NaN,
      };

      await expect(OrderService.createNewOrder(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("createNewOrder", () => {
    const spy = jest.spyOn(OrderService, "createNewOrder");
    const returnValue = {
      status: false,
      message: "Product not found",
      statusCode: 404,
    };

    beforeEach(() => {
      UserRepository.findOne = jest.fn().mockResolvedValue({
        id: 1,
        public_id: "8ece32ad-ae30-489a-a4cf-cc8c56e96da3",
        created_at: "2024-07-17T12:26:42.304Z",
        updated_at: "2024-07-17T12:26:42.304Z",
        deleted_at: null,
        username: "Varsilias",
        email: "daniel@gmail.com",
      });
      ProductRepository.findOne = jest.fn().mockResolvedValue(null);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return 'product not found' if wrong product ID is provided", async () => {
      const payload = {
        user_id: Number.NaN,
        product_id: Number.NaN,
      };

      await expect(OrderService.createNewOrder(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("createNewOrder", () => {
    const spy = jest.spyOn(OrderService, "createNewOrder");
    const returnValue = {
      status: true,
      message: "Order created successfully",
      statusCode: 201,
      data: {
        id: 1,
        public_id: "00baf3f9-df36-495d-85eb-586ec11e7cdc",
        created_at: new Date("2024-07-17T13:43:26.172Z"),
        updated_at: new Date("2024-07-17T13:43:26.172Z"),
        deleted_at: null,
        user_id: {
          id: 1,
          public_id: "8ece32ad-ae30-489a-a4cf-cc8c56e96da3",
          created_at: new Date("2024-07-17T12:26:42.304Z"),
          updated_at: new Date("2024-07-17T12:26:42.304Z"),
          deleted_at: null,
          username: "Varsilias",
          email: "daniel@gmail.com",
        },
        product_id: {
          id: 1,
          public_id: "828188cc-6820-4f54-9be8-d6e005784d99",
          created_at: new Date("2024-07-17T13:11:06.484Z"),
          updated_at: new Date("2024-07-17T13:11:06.484Z"),
          deleted_at: null,
          product_name: "Product 1",
          product_description: "Product description 1",
          product_price: 1200.0,
        },
      } as OrderEntity,
    };

    beforeEach(() => {
      UserRepository.findOne = jest.fn().mockResolvedValue({
        id: 1,
        public_id: "8ece32ad-ae30-489a-a4cf-cc8c56e96da3",
        created_at: "2024-07-17T12:26:42.304Z",
        updated_at: "2024-07-17T12:26:42.304Z",
        deleted_at: null,
        username: "Varsilias",
        email: "daniel@gmail.com",
      });
      ProductRepository.findOne = jest.fn().mockResolvedValue({
        id: 1,
        public_id: "828188cc-6820-4f54-9be8-d6e005784d99",
        created_at: "2024-07-17T13:11:06.484Z",
        updated_at: "2024-07-17T13:11:06.484Z",
        deleted_at: null,
        product_name: "Product 1",
        product_description: "Product description 1",
        product_price: 1200.0,
      });
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return create new product successfully, if the right product and user ID is provided", async () => {
      const payload = {
        user_id: 1,
        product_id: 1,
      };

      const promise = OrderService.createNewOrder(payload);

      await expect(promise).resolves.toHaveProperty("statusCode", 201);
      await expect(promise).resolves.toHaveProperty("status", true);
      await expect(promise).resolves.toHaveProperty("message", "Order created successfully");
      await expect(promise).resolves.toHaveProperty("data");
      await expect(promise).resolves.toHaveProperty("data.user_id");
      await expect(promise).resolves.toHaveProperty("data.product_id");
    });
  });
});
