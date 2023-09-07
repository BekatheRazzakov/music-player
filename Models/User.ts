import {Schema, model, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {IUser} from "../type";
import {randomUUID} from "crypto";

const SALT_WORK_FACTOR = 8;

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>,
  generateToken(): void,
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

UserSchema.pre('save',async function(next) {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function() {
  this.token = randomUUID();
}

const User = model('User', UserSchema);
export default User;