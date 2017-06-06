/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */

import mongoose from 'mongoose';

const ErrorSchema = mongoose.Schema({
  error: Number,
  msg: String,
  signature: String,
  details: Array,
  created_at: { type: Date, default: Date.now},
});

export default mongoose.model('Error', ErrorSchema);