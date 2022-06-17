import { app } from "./app";

import { dataSource } from "@shared/infra/typeorm/";

const initDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log("Database initialized");
  } catch (error) {
    console.log(error);
  }
} 
initDatabase();

app.listen(3333, () => console.log("Server is running!!"));