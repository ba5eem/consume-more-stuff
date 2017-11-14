import React from 'react';
import ItemDetailView from './ItemDetailView';

const _ = require('lodash');



const ItemList = ({items,loadSingleItem,edit}) => {
  return (
    <div className='allItemList'>
      {
        items.map((item,idx) => {
          return (

            <ItemDetailView
              loadSingleItem={loadSingleItem}
              edit={edit}
              key={idx}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              manufacturer={item.manufacturer}
              model={item.model}
              dimensions={item.dimensions}
              notes={item.notes}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              itemstatusId={item.itemstatus.title}
              userId={item.seller.username}
              conditionId={item.itemcondition.title}
              categoryId={item.itemcategory.title}
            />
          )

        })
      }
    </div>

  )
}
/*let newArr = _.sortBy(this.props.items, 'createdAt', function(n) {
        return Math.sin(n)
    });*/

{/*const ItemList = ({items,loadSingleItem,edit}) => {
  return (
    <div className='allItemList'>
      {
        /*_.sortBy(items, 'createdAt', function(n) {
            return Math.sin(n);
          }
        )

        items.sort().map((item,idx) => {
          return (



            <ItemDetailView
              loadSingleItem={loadSingleItem}
              edit={edit}
              key={idx}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
              manufacturer={item.manufacturer}
              model={item.model}
              dimensions={item.dimensions}
              notes={item.notes}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              itemstatusId={item.itemstatus.title}
              userId={item.seller.username}
              conditionId={item.itemcondition.title}
              categoryId={item.itemcategory.title}
            />
          )

        })
      }
    </div>

  )
}
*/}

export default ItemList;


