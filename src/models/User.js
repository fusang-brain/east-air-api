/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = mongoose.Schema({
  name: {type: String, required: true },
  nick_name: String,
  password: {type: String, required: true},
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now},
});

export default mongoose.model('User', UserSchema);