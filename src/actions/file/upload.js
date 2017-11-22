/**
 * Created by alixez on 17-7-28.
 */

import config from '../../config';
import fs from 'fs';

export default async function (req, params, {response, models}) {
  if (!req.file) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }
  const uploadType = params[0];
  const supportFile = config.storage.supportFile[uploadType] || [];
  const File = models.File;
  const file = req.file;
  if (!Array.isArray(file)) {
    // console.log(file);
    const ext = file.mimetype.split('/')[1];
    if (supportFile.indexOf(ext) < 0) {
      fs.unlinkSync(file.path);
      return {
        code: response.getErrorCode(),
        message: `此模式不支持上传 ${ext} 格式的文件`,
      }
    }

    const createdFile = await File.create({
      filename: file.filename,
      abs_path: file.path,
      path: `${config.storage.pathFolder}/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
      origin_filename: file.originalname,
    });

    return {
      code: response.getSuccessCode(),
      message: '图片上传成功',
      data: {
        file: createdFile,
        file_path: createdFile.path,
      }
    }
  }
  let files = [];
  let filePaths = [];
  for (let i = 0; i < file.length; i ++) {
    let item = file[i];
    const ext = item.mimetype.split('/')[1];
    if (supportFile.indexOf(ext) < 0) {
      fs.unlinkSync(item.path);
      return {
        code: response.getErrorCode(),
        message: `此模式不支持上传 ${ext} 格式的文件`,
      }
    }
    let fileObj = await File.create({
      filename: item.filename,
      abs_path: item.path,
      path: `${config.storage.pathFolder}/${item.filename}`,
      mimetype: item.mimetype,
      size: item.size,
      origin_filename: item.originalname,
    });

    files.push(fileObj);
    filePaths.push(fileObj.path);
  }

  return {
    code: response.getSuccessCode(),
    message: '文件上传成功',
    data: {
      files: files,
      file_paths: filePaths,
    }
  }

}