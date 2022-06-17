import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';

import { dataSource } from '@shared/infra/typeorm/';

const createSeed = async (dataSource: DataSource) => {
  const name: string = "admin";
  const email: string = "admin@admin.com";
  const id: string = uuidV4();
  const password: string = await hash("admin",8);
  await dataSource.query(
    `INSERT INTO users (id, name, email, password, "isAdmin",driver_license) \
    VALUES ('${id}','${name}','${email}','${password}',true,'')`
  );
}


describe('Create Category Controller', () => {

  beforeAll(async () => {
    if(dataSource.isInitialized){
      await dataSource.destroy();
    }
    await dataSource.initialize();
    await dataSource.runMigrations();
    await createSeed(dataSource);
    
  });
  

  it('Should be possible create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin'
    });

    const { refreshToken } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest"
      }).set({
        Authorization: `Bearer ${refreshToken}`
      });
    expect(response.status).toBe(201);
  });

  it("Shouldn't be possible create a new category with duplicated name", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin'
    });

    const { refreshToken } = responseToken.body;
    await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest"
      }).set({
        Authorization: `Bearer ${refreshToken}`
      });

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest"
      }).set({
        Authorization: `Bearer ${refreshToken}`
      });

    expect(response.status).toBe(400);
  });

  afterAll( async ()=>{
    // await dataSource.dropDatabase();
    for( let migration of dataSource.migrations ){
      await dataSource.undoLastMigration();
    }
    await dataSource.destroy();
  });
})