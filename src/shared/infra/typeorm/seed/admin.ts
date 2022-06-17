import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { dataSource } from "@shared/infra/typeorm/";

const create = async () => {
  const name: string = "admin";
  const email: string = "admin@admin.com";
  const id: string = uuidV4();
  const password: string = await hash("admin",8);
  await dataSource.initialize();
  await dataSource.query(
    `INSERT INTO users (id, name, email, password, "isAdmin",driver_license) \
    VALUES ('${id}','${name}','${email}','${password}',true,'')`
  );
  await dataSource.destroy();
}


create().then( () => console.log("Admin created!"))