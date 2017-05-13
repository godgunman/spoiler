/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: 'string',
    text: 'string',
    startSecond: 'integer',
    duration: { 
      type: 'integer', 
      defaultsTo: 10
    },
    owner: {
      model: 'video',
    },
    user: {
      model: 'user',
      unique: true
    }
  }
};

