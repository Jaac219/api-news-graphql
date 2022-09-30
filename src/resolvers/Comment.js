const comment =  require('../models/Comment.js');
const notice =  require('../models/Notice.js');
const user =  require('../models/User.js');

const { generateId, handlePagination } = require('@codecraftkit/utils');

const Comment_Get = async (_, {filter = {}, option = {}}) => {
  try {
    let { _id, body, date, userId, noticeId } = filter;
    let { skip, limit } = handlePagination(option);

    let query = {isRemove: false}
    if(_id) query._id = _id;
    if(body) query.body = {$regex: body, $options: 'i'}
    if(date) query.date = new Date(date);
    if(userId) query.userId = userId
    if(noticeId) query.noticeId = noticeId

    let find = comment.find(query);

    if(skip) find.skip(skip)  
    if(limit) find.limit(limit)

    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Comment_Save = async (_, {commentInput})=>{
  try {
    if(commentInput._id) return await Comment_Update(_, {commentInput})
    return await Comment_Create(_, {commentInput})
  } catch (error) {
    return error;
  }
}

const Comment_Create = async (_, {commentInput})=>{
  try {
    let _id = generateId();
    await new comment({_id, ...commentInput}).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Comment_Update = async (_, {commentInput}) => {
  try {
    await comment.findByIdAndUpdate(commentInput._id, {$set: commentInput}, {new: true})
    return commentInput._id;
  } catch (error) {
    return error;
  }
}

const Comment_Delete = async (_, _id)=>{
  try {
    await comment.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Comment_Get
  },
  Mutation:{
    Comment_Save, 
    Comment_Delete
  },
  Comment: {
    user: async(parent, args)=>{
      return await user.findById(parent.userId)
    },
    notice: async(parent, args)=>{
      return await notice.findById(parent.noticeId)
    }
  }
}
