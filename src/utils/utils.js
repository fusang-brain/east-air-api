/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
export function randomString() {
  let time = new Date().getTime();
  let suffix = Math.random().toString(36).substring(5);
  return `${time}-${suffix}`;
}