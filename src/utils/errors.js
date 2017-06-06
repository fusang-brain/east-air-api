/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */

// import mongoose from 'mongoose';
// import md5 from 'md5';
// import '../models/Error';
// import '../models/Ids';
//
// const ErrorModel = mongoose.model('Error');
// const IdsModel = mongoose.model('Ids');
//
// export async function getApiErrorsAsync(sign, msg, errors = null) {
//   const errorModel = new ErrorModel();
//   const errorDetails = [];
//   if (errors) {
//     for(let value in errors) {
//       if (errors[value].message) {
//         errorDetails.push(errors[value].message);
//       }
//     }
//   }
//   const signature = md5(sign + errorDetails.join('|'));
//
//   try {
//     let errorData = await ErrorModel.findOne({ signature });
//
//     if (!errorData) {
//       const ids = await IdsModel.findOneAndUpdate({ name: 'error'}, {$inc: {id: 1}});
//       if (!ids) {
//         return {
//           error: '1000',
//           msg: '对方不想理你，并想你抛了个异常',
//         };
//       }
//       errorModel.msg = msg;
//       errorModel.signature = signature;
//       errorModel.error = ids.id;
//       errorModel.details = errorDetails;
//       errorData = await errorModel.save();
//
//     }
//
//     return {
//       error: errorData.error,
//       msg: errorData.msg,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       error: '1000',
//       msg: '对方不想理你，并想你抛了个异常',
//     };
//   }
// }