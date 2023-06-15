import { PrismaClient, Prisma } from '@prisma/client'
import request from "supertest"
import app from "../../app.js"

async function cleanupDatabase() {
    const prisma = new PrismaClient();
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);
  
    return Promise.all(
      modelNames.map((modelName) => prisma[modelName.toLowerCase()].deleteMany())
    );
}

describe ("POST /sign-in", () => {
    const user = {
        name: 'John',
        email: 'john9@example.com',
        password: 'insecure',
    }
    const token = {
      accessToken: 'owiejqowie'
    }

    beforeAll(async () => {
        await cleanupDatabase()
    
    })
    
    afterAll(async () => {
        await cleanupDatabase()
    })

    it("with valid data should return token", async () => {
      const createUserResponse = await request(app)
        .post("/users")
        .send(user)
        .set('Accept', 'application/json');
  
      const signInResponse = await request(app)
        .post("/sign-in")
        .send(user)
        .set('Accept', 'application/json');
  
      expect(signInResponse.statusCode).toBe(200);
      expect(signInResponse.body.accessToken).toBeTruthy();
    });

    it("with invalid email should fail", async () => {
      
      const createUserResponse = await request(app)
        .post("/users")
        .send(user)
        .set('Accept', 'application/json');
      
      user.email = "dave@example.com"
      const signInResponse = await request(app)
        .post("/sign-in")
        .send(user)
        .set('Accept', 'application/json');
  
      expect(signInResponse.statusCode).toBe(401);
      expect(signInResponse.body.error).toBeTruthy();
      expect(signInResponse.body.error).toBe('Email address or password not valid')
    });

    it("with invalid email should fail", async () => {
      
      const createUserResponse = await request(app)
        .post("/users")
        .send(user)
        .set('Accept', 'application/json');
      
      user.password = "1234"
      const signInResponse = await request(app)
        .post("/sign-in")
        .send(user)
        .set('Accept', 'application/json');
  
      expect(signInResponse.statusCode).toBe(401);
      expect(signInResponse.body.error).toBeTruthy();
      expect(signInResponse.body.error).toBe('Password not valid')
    });
})
  