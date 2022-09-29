const user =  require('../models/User.js');
const notice =  require('../models/Notice.js');

const { generateId, handlePagination } = require('@codecraftkit/utils')

const User_Get = async(_, {filter = {}, option = {}}) =>{
  try {
    let { skip, limit } = handlePagination(option);
    let { _id, userName, name, phone, address } = filter;
    
    let query = {isRemove: false}
    if(_id) query.id = _id;
    if(userName) query.userName = { $regex: userName, $options: 'i' }
    if(name) query.name = { $regex: name, $options: 'i' }
    if(phone) query.phone = phone
    if(address && address.city) query = {...query, 'address.city': { $regex: address.city, $options: 'i' }}
    if(address && address.street) query = {...query, 'address.street': { $regex: address.street, $options: 'i' }}
    if(address && address.number) query = {...query, 'address.number': address.number}
    
    let find = user.find(query);
    if(skip) find.skip(skip)  
    if(limit) find.limit(limit)
    
    return await find.exec();
  } catch (error) {
    return error;
  }
}

const User_Save = async(_, {userInput})=>{
  try {
    if (userInput._id) return await User_Update(_, {userInput});
    return await User_Create(_, {userInput});
  } catch (error) {
    return error;
  }
}

const User_Create = async(_, {userInput})=>{
  try {
    const _id = generateId();
    await new user({_id, ...userInput}).save();
    return _id;
  } catch (error) {
    return error;
  }
}

const User_Update = async (_, {userInput}) =>{
  try {
    await user.findByIdAndUpdate(userInput._id, {$set: userInput}, {new: true})
    return userInput._id;
  } catch (error) {
    return error;
  }
}

const User_Delete = async(_, {_id}) =>{
  try {
    await user.findByIdAndUpdate(_id, {$set: {isRemove: true}});
    return true;
  } catch (error) {
    return error;
  }
}

const User_Count = async(_, {filter = {}}) =>{
  try {
    let { _id, userName, name, phone, address } = filter;
      
    let query = {isRemove: false}
    if(_id) query.id = _id;
    if(userName) query.userName = { $regex: userName, $options: 'i' }
    if(name) query.name = { $regex: name, $options: 'i' }
    if(phone) query.phone = phone
    if(address && address.city) query = {...query, 'address.city': { $regex: address.city, $options: 'i' }}
    if(address && address.street) query = {...query, 'address.street': { $regex: address.street, $options: 'i' }}
    if(address && address.number) query = {...query, 'address.number': address.number}    
    
    return await user.countDocuments(query);
  } catch (error) {
    return error
  }

}

module.exports = {
  Query:{
    User_Get,
    User_Count
  },
  Mutation:{
    User_Save,
    User_Delete
  },
  User: {
    notice: async(root, args) => {
      return await notice.find({userId: root._id})
    }
  }
}