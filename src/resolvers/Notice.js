const notice =  require('../models/Notice.js');
const user =  require('../models/User.js');
const comment =  require('../models/Comment.js');

const { generateId, handlePagination } = require('@codecraftkit/utils');

const Notice_Get = async (_, {filter = {}, option = {}}) => {
  try {
    let { _id, title, body, date, userId } = filter;
    let { skip, limit } = handlePagination(option);

    let query = {isRemove: false}
    if(_id) query._id = _id;
    if(title) query.title = {$regex: title, $options: 'i'}
    if(body) query.body = {$regex: body, $options: 'i'}
    if(date) query.date = new Date(date);
    if(userId) query.userId = userId

    let find = notice.find(query);
    
    if(skip) find.skip(skip)  
    if(limit) find.limit(limit)
 
    return await find.exec();
  } catch (error) {
    return error;
  }
}

const Notice_Save = async (_, {noticeInput})=>{
  try {
    if(noticeInput._id) return await Notice_Update(_, {noticeInput})
    return await Notice_Create(_, {noticeInput})
  } catch (error) {
    return error;
  }
}

const Notice_Create = async (_, {noticeInput})=>{
  try {
    let _id = generateId();
    await new notice({_id, ...noticeInput}).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const Notice_Update = async (_, {noticeInput}) => {
  try {
    await notice.findByIdAndUpdate(noticeInput._id, {$set: noticeInput}, {new: true})
    return noticeInput._id;
  } catch (error) {
    return error;
  }
}

const Notice_Delete = async (_, _id)=>{
  try {
    await notice.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}

module.exports = {
  Query: {
    Notice_Get
  },
  Mutation:{
    Notice_Save,
    Notice_Delete
  },
  Notice: {
    user: async(parent, args) =>{
      return await user.findById(parent.userId);
    },
    comment: async(parent, args)=>{
      return await comment.find({noticeId: parent._id});
    }
  }
}
