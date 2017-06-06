/**
 * Copyright(c) omk 2016
 * Filename:
 * Author  : alixez
 */
require('babel-polyfill');


const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Eastern air API',
    description: 'All the modern best practices at here.',
    head: {
      titleTemplate: 'Eastern air: %s',
      meta: [
        {name: 'description', content: 'All the modern best practices at here.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Eastern air'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Eastern air'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    },
  },
}, environment);