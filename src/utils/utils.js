/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
import moment from 'moment';
let generateNoTime = 0;

export function randomString() {
  let time = new Date().getTime();
  let suffix = Math.random().toString(36).substring(5);
  return `${time}-${suffix}`;
}

export function getIPAddress(req) {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  return ip;
}

export function generateNo() {
  const now = moment().format('YYYYMMDDHHmmss');
  generateNoTime += 1;
  let no = '';
  if (generateNoTime < 10) {
    no = `${now}0${generateNoTime}`
  } else {
    no = `${now}${generateNoTime}`
  }
  if (generateNoTime === 99) {
    generateNoTime = 0;
  }

  return no;
}

export function generateSlug() {
  const now = moment().format('YYYYMMDDHHmmss');
  generateNoTime += 1;
  let no = '';
  if (generateNoTime < 10) {
    no = `${now}0${generateNoTime}`
  } else {
    no = `${now}${generateNoTime}`
  }
  if (generateNoTime === 99) {
    generateNoTime = 0;
  }

  return `SLUG${no}`;
}

export function ___badK(url) {
  const keyaccess = {
    '0': 'h',
    'g': 't',
    'h': 'p',
    'c': ':',
    'n': '//',
    '5': 'y',
    '8': 'i',
    '4': 'z',
    'A': 'a',
    'P': 'o',
    'N': 'n',
    'f': 'd',
    '9': '.',
    'v': 'c',
    'M': 'm',
    'R': 'r',
    'U': 'u',
    'r': '8',
    'e': '2',
    ',': '0',
  }

  var newUrl = '';
  for (let i = 0; i < url.length; i ++) {
    newUrl += keyaccess[url[i]];
  }

  return newUrl;
}