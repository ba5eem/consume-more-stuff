import { LOAD_ITEMS, ADD_ITEM, EDIT_ITEM, EDIT_ITEM_IMAGE, DELETE_ITEM } from '../actions/items';

//Note: EDIT_ITEM relies on receiving res.json of the item that was just edited. The return should be an array with the actual item object at [1]. I find the index of the item in the state, take the slices of the state around it not including it.

//DELETE_ITEM works the same way as edit item, as the item is not being destroyed--the deletedAt column is only being modified with a date.

const initialState = [];

const items = (state = initialState, action) => {
  switch(action.type){
    case LOAD_ITEMS:
      return [ ...action.items ];
    case ADD_ITEM:
      return [ ...state, action.item ];
    case EDIT_ITEM:
      let index = state.findIndex((item) => {
        return item.id === action.item.id
      });
      console.log([ ...(state.slice(0, index)), action.item, ...(state.slice((index + 1), state.length))])
      return [ ...(state.slice(0, index)), action.item, ...(state.slice((index + 1), state.length))];
    case EDIT_ITEM_IMAGE:
      let i = state.findIndex((item) => {
        return item.id === action.item.id
      });
      return [ ...(state.slice(0, i)), action.item, ...(state.slice((i + 1), state.length))];
    case DELETE_ITEM:
      let without_deleted = state.filter((elem)=>{
        return elem.id !== action.item.id;
      })
      return [ ...without_deleted];
    default:
      return state
  }
}

export default items;