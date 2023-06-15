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
      // Create the user
      const createUserResponse = await request(app)
        .post("/users")
        .send(user)
        .set('Accept', 'application/json');
  
      expect(createUserResponse.statusCode).toBe(200);
  
      // Sign in with the user
      const signInResponse = await request(app)
        .post("/sign-in")
        .send(user)
        .set('Accept', 'application/json');
  
      expect(signInResponse.statusCode).toBe(200);
      expect(signInResponse.body.token).toBeTruthy;
      console.log({ "signInResponse.body.token": signInResponse.body.token})
    });

    // it("with invalid email should fail", async () => {
    //   // Create the user
    //   const createUserResponse = await request(app)
    //     .post("/users")
    //     .send(user)
    //     .set('Accept', 'application/json');
  
    //   expect(createUserResponse.statusCode).toBe(200);
  
    //   // Sign in with the user
    //   const signInResponse = await request(app)
    //   user.email = "dave@example.com"
    //     .post("/sign-in")
    //     .send(user)
    //     .set('Accept', 'application/json');
  
    //   expect(signInResponse.statusCode).toBe(402);
    //   expect(signInResponse.body.error).toBeTruthy
    //   expect(signInResponse.body.error.email).toBe('Email address or password not valid')
    // });
  

})
  