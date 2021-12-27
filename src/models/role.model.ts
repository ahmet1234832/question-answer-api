import * as mongoose from 'mongoose';

export class RoleModel {
  name: string;
  description: string;
}

export const RoleSchema = new mongoose.Schema({
  name: { type: String, required: ['Role must be declared.'] },
  description: {
    type: String,
    required: ['A role must have a description of itself.'],
  },
});
