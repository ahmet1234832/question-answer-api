import * as mongoose from 'mongoose';
import { RoleModel } from './role.model';
import * as bcrypt from 'bcrypt';

export class UserModel {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  roles: RoleModel[];
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: [2, 'Two characters minimum bruh.'],
    maxlength: [15, '15 characters maximum'],
  },
  surname: {
    type: String,
    required: [true, 'A user must have a surname too ofcourse'],
    minlength: [2, 'Two minimum length!'],
    maxlength: [15, '15 characters maximum'],
  },
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    minlength: [2, 'Two characters minimum.'],
    maxlength: [15, '15 is more than enough for username'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'Min 8 characters long.'],
  },
  email: { type: String, required: [true, 'A user must have a email'] },
  createdAt: { type: Date, default: Date.now() },
  roles: { type: Array, default: ['auth'] },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltOrRounds = 10;
    const password = this.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    this.password = hash;
  }
  next();
});
