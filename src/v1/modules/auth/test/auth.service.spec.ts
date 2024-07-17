import * as AuthService from "../auth.service";
import { ISignUpDto } from "../types";
import * as JwtService from "../jwt.service";
import { UserRepository } from "../_user/user.repository";
import * as UtilService from "../utils.service";
import "reflect-metadata";

describe("AuthService", () => {
  describe("findUserById", () => {
    beforeEach(() => {
      UserRepository.findOneBy = jest.fn().mockResolvedValue({
        id: 1,
        public_id: "test-uuid",
        username: "Miamor",
        email: "aj@gmail.com",
        sanitize() {
          return {
            id: 1,
            public_id: "test-uuid",
            username: "Miamor",
            email: "aj@gmail.com",
          };
        },
      });
    });
    it("should return a user given a valid User ID", async () => {
      const expected = {
        id: 1,
        public_id: "test-uuid",
        username: "Miamor",
        email: "aj@gmail.com",
      };

      await expect(AuthService.findUserById(1)).resolves.toEqual(expected);
    });
  });

  describe("findUserById", () => {
    beforeEach(() => {
      UserRepository.findOneBy = jest.fn().mockResolvedValue(undefined);
    });

    it("should return null given an invalid User ID", async () => {
      const expected = undefined;

      await expect(AuthService.findUserById(Number.NaN)).resolves.toEqual(expected);
    });
  });

  describe("signUp", () => {
    const spy = jest.spyOn(AuthService, "signUp");

    beforeEach(() => {
      spy.mockImplementationOnce(async () => ({
        status: false,
        message: "Email already in use.",
        statusCode: 400,
      }));
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Email already in use' when non unique email is passed", async () => {
      const payload = {
        username: "Miamor",
        email: "aj@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signUp(payload)).resolves.toEqual({
        status: false,
        message: "Email already in use.",
        statusCode: 400,
      });
    });
  });

  describe("signUp", () => {
    const spy = jest.spyOn(AuthService, "signUp");
    const returnValue = {
      status: true,
      message: "Sign up successful",
      statusCode: 200,
      data: {
        id: 1,
        public_id: "test-uuid",
        username: "Miamor",
        email: "aj@gmail.com",
        password: "P@ssword1234",
        created_at: new Date("2024-07-17T22:23:12.348Z"),
        updated_at: new Date("2024-07-17T22:23:12.348Z"),
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
    it("should return successfully create and return user object", async () => {
      const payload = {
        username: "user12be",
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signUp(payload)).resolves.toEqual(returnValue);
    });
  });
  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const returnValue = {
      status: false,
      message: "Invalid Credentials.",
      statusCode: 400,
    };

    beforeEach(() => {
      UserRepository.findUserWithPasswordAndSalt = jest.fn().mockResolvedValue(null);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Invalid credentials' when user is not found", async () => {
      const payload = {
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const returnValue = {
      status: false,
      message: "Invalid Credentials.",
      statusCode: 400,
    };

    beforeEach(() => {
      UserRepository.findUserWithPasswordAndSalt = jest
        .fn()
        .mockResolvedValue({ email: "user12be@gmail.com", password: "P@ssword1234" });
      const utilSpy = jest.spyOn(UtilService, "comparePassword");
      utilSpy.mockImplementationOnce(() => false);
      spy.mockImplementationOnce(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return 'Invalid credentials' when password is not a match", async () => {
      const payload = {
        email: "user12be@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toEqual(returnValue);
    });
  });

  describe("signIn", () => {
    const spy = jest.spyOn(AuthService, "signIn");
    const accessTokenSpy = jest.spyOn(JwtService, "signAccessToken");
    const refreshTokenSpy = jest.spyOn(JwtService, "signRefreshToken");
    const user = {
      id: 1,
      public_id: "test-uuid",
      username: "Miamor",
      email: "aj@gmail.com",
      password: "P@ssword1234",
      created_at: new Date("2024-07-17T22:23:12.348Z"),
      updated_at: new Date("2024-07-17T22:23:12.348Z"),
      deleted_at: null,
      orders: [],
    };
    const returnValue = {
      status: true,
      message: "Login Successful",
      statusCode: 200,
      data: { token: { access_token: "12345", refresh_token: "678910" }, user },
    };

    beforeEach(() => {
      accessTokenSpy.mockImplementationOnce(() => "12345");
      refreshTokenSpy.mockImplementationOnce(() => "678910");
      spy.mockImplementation(async () => returnValue);
    });

    afterEach(() => {
      spy.mockReset();
    });
    it("should return token and user data on successful sign in", async () => {
      const payload = {
        email: "aj@gmail.com",
        password: "P@ssword1234",
      } as ISignUpDto;
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("statusCode", 200);
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("status", true);
      await expect(AuthService.signIn(payload)).resolves.toHaveProperty(
        "message",
        "Login Successful",
      );

      await expect(AuthService.signIn(payload)).resolves.toHaveProperty("data", {
        token: { access_token: "12345", refresh_token: "678910" },
        user: {
          id: 1,
          public_id: "test-uuid",
          username: "Miamor",
          email: "aj@gmail.com",
          password: "P@ssword1234",
          created_at: new Date("2024-07-17T22:23:12.348Z"),
          updated_at: new Date("2024-07-17T22:23:12.348Z"),
          deleted_at: null,
          orders: [],
        },
      });
    });
  });
});
