import user from '../models/User.js';

import  pkg from '@codecraftkit/utils';
const { generateId, handlePagination } = pkg;

const User_Get = async(_, {filter = {}, option = {}}) =>{
  try {
    let { _id, userName, name, phone, address } = filter;
    
    const { skip, limit } = handlePagination(option);
    
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
    
    return await find.lean();
    
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

export default {
  Query:{
    User_Get
  },
  Mutation:{
    User_Save
  }
}