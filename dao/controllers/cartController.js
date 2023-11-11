const cartRepository = require('../repositories/cartRepository');

exports.createCart = async () => {
  return await cartRepository.createCart();
};

exports.getCartById = async (cid) => {
  return await cartRepository.getCartById(cid);
};

exports.updateCart = async (cart) => {
  return await cartRepository.updateCart(cart);
};

exports.addProductCart = async (cid, pid) =>{
  return await cartRepository.addProductCart(cid, pid) 
}

exports.getCartPopulated = async (cid) =>{
  return await cartRepository.getCartPopulated(cid)
}


exports.buyCart = async (cid) =>{
  return await cartRepository.buyCart(cid)
}