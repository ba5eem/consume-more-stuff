const axios = require('axios');

//Note: editItem expects backend to send back the new item that was edited. When returning Item.update, make sure returning: true is included in the options object, and res.json back the item.

//Note: deleteItem takes in an object with a key of id, designating the item whose deletedAt will be modified on the backend. It should send back the object it just modifed.

export const LOAD_ITEMS = 'LOAD_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDIT_ITEM_IMAGE = 'EDIT_ITEM_IMAGE';
export const DELETE_ITEM = 'DELETE_ITEM';

export const loadItems = () => {
  return function(dispatch){
    return axios.get('/api/items')
    .then( items => {
      dispatch({
        type: LOAD_ITEMS,
        items: items.data
      });
    });
  }
}

export const addItem = (newItem) => {
  return function(dispatch){
    return axios.post('/api/items', newItem)
    .then( item => {
      dispatch({
        type: ADD_ITEM,
        item: item.data
      });
    });
  }
}

export const editItem = (newInfo) => {
  return function(dispatch){
    return axios.put(`/api/items/${newInfo.id}`, newInfo)
    .then( item => {
      dispatch({
        type: EDIT_ITEM,
        item: item.data
      });
    });
  }
}

export const editItemImage = (newInfo) => {
  return function(dispatch){
    console.log('action dispatched');
    console.log('newInfo', newInfo);
    return axios.put(`/api/items/images/${newInfo.id}`, newInfo)
    .then( item => {
      dispatch({
        type: EDIT_ITEM_IMAGE,
        item: item.data
      });
    });
  }
}

export const deleteItem = (id) => {
  return function(dispatch){
    return axios.delete(`/api/items/${id}`)
    .then ( item => {
      dispatch ({
        type: DELETE_ITEM,
        item: item.data
      })
    })
  }
}