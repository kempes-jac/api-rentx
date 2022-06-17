import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Expose } from 'class-transformer'

@Entity('users')
class User{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({name: 'avatarURL'})
  avatarURL():string{
    switch(process.env.DISK_TYPE){
      case 's3':{
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      }
      case 'local':{
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`
      }
      default: {
        return null
      }
    }
  }

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}

export { User }