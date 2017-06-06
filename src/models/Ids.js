/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
import mongoose from 'mongoose';

const IdsSchema = mongoose.Schema({
  name: String,
  id: Number,
  created_at: { type: Date, default: Date.now},
});



export default mongoose.model('Ids', IdsSchema);