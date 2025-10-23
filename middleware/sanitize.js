/*
* sanitize.js
* author: Antonio De la Merced
* Date: 10/21/25
*/

const sanitizeHTML = require('sanitize-html');

const sanitize = (request, response, next) => {
  if (request.params) {
    Object.keys(request.params).forEach(key => {
      request.params[key] = sanitizeHTML(request.params[key]);
    });
  }
  
  next();
};

module.exports = sanitize;
