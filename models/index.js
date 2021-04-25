// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Posts belongsTo User, Users have many Posts
Post.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Post, { foreignKey: 'user_id'});//, onDelete: 'cascade' }); // the cascade onDelete doesn't work here, works when specified in the Post model/class

// Comments belongsTo User, Users have many Comments
Comment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id'});//, onDelete: 'cascade' }); // the cascade onDelete doesn't work here, works when specified in the Comment model/class

// Comments belongsTo Post, Posts have many Comments
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Comment, { foreignKey: 'post_id'});//, onDelete: 'cascade' }); // the cascade onDelete doesn't work here, works when specified in the Comment model/class


module.exports = { User, Post, Comment };
