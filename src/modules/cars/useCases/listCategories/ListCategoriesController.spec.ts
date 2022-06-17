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


describe('List Categories', () => {

  beforeAll(async () => {
    if(dataSource.isInitialized){
      await dataSource.destroy();
    }
    await dataSource.initialize();
    await dataSource.runMigrations();
    await createSeed(dataSource);
    
  });
  

  it('Should be possible list all available categories', async () => {

    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin'
    });
    const { refreshToken } = responseToken.body;
   await request(app)
      .post("/categories")
      .send({
        name: "Category 1",
        description: "Category SuperTest"
      }).set({
        Authorization: `Bearer ${refreshToken}`
      });
    await request(app)
      .post("/categories")
      .send({
        name: "Category 2",
        description: "Category SuperTest"
      }).set({
        Authorization: `Bearer ${refreshToken}`
      });


    const response3 = await request(app).get("/categories");

    expect(response3.status).toBe(200);
    expect(response3.body.length).toBe(2);
    expect(response3.body[0]).toHaveProperty("id");
    expect(response3.body[0].name).toEqual("Category 1");
    expect(response3.body[1]).toHaveProperty("id");
  });


  afterAll( async ()=>{
    // await dataSource.dropDatabase();
    for( let migration of dataSource.migrations ){
      await dataSource.undoLastMigration();
    }
    await dataSource.destroy();
  });
})