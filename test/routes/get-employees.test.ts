import getTestFastify from "../app-test";
import { destroyTestDb, generateTestDb } from "../db-test";

const app = getTestFastify();

describe("GET /api/employees", () => {
  beforeEach(async () => {
    await generateTestDb(app);
  });
  afterEach(async () => {
    await destroyTestDb(app);
  });

  it("should return all employees", async () => {
    const result = await app.inject({
      url: "/api/employees",
      method: "GET",
    });

    const response = result.json();
    expect(response).toHaveLength(10);
  });

  it("should return 404 when no Employee found", async () => {
    const res = await app.inject({
      url: "/api/employees/420",
      method: "GET",
    });
    const response = res.json();
    const statusCode = res.statusCode;
    expect(statusCode).toEqual(404);
    expect(response).toEqual({
      message: "No employee found",
    });
  });
});
