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
});
