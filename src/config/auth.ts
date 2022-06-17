import path from 'path';
import dotenv from 'dotenv';

class Auth {
  constructor(){
  }
  
  static auth(){
    dotenv.config({ path: path.resolve("./",".env")});
    return {
      expiresIn: "180m",
      secretToken: process.env.TOKEN_SECRET,
      expiresInDaysRefreshToken: 30,
      expiresInRefreshToken: "30d",
      secretRefreshToken: process.env.REFRESHTOKEN_SECRET,
      expiresInHours: 3
    }
  }
}

export default Auth.auth()