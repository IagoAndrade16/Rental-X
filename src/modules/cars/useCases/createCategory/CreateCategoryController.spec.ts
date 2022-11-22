import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
        values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')`
    );

    await connection.close();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("sould be able to create a new category ", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test category",
        description: "description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("sould not be able to create a new category if name exists", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Test category",
        description: "description test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
