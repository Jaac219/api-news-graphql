const comment =  require('../models/Comment.js');

const { generateId, handlePagination } = require('@codecraftkit/utils');

const Comment_Get = async (_, {filter = {}, option = {}}) => {
  try {
    let { _id, body, date, userId, noticeId } = filter;
    let { skip, limit } = handlePagination(option);

    let query = {isRemove: false}
    if(_id) query._id = _id;
    if(body) query.body = {$regex: body, $options: 'i'}
    if(date) query.date = {$regex: date, $options: 'i'}
    if(userId) query.userId = userId
    if(noticeId) query.noticeId = noticeId

    let find = await comment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind:{
          path:"$user",
          preserveNullAndEmptyArrays:true
        }
      },
      {
        $lookup: {
          from: "notices",
          localField: "noticeId",
          foreignField: "_id",
          pipeline: [{
            $lookup:{
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user"
            }
          },
          {
            $unwind:{
              path:"$user",
              preserveNullAndEmptyArrays:true
            }
          }],
          as: "notice"
        }
      },
      {
        $unwind:{
          path:"$notice",
          preserveNullAndEmptyArrays:true
        }
      },
      { "$match": query }
    ]);

    if(skip) find.skip(skip)  
    if(limit) find.limit(limit)

    // for (let i in find){
    //   find[i].user = find[i].user[0];
    //   find[i].notice = find[i].notice[0];
    // }

    return find;
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
  }
}
