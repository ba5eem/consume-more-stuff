import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadItems,editItem,deleteItem } from '../../actions/items';
import ItemStatusList from '../../components/ItemStatusList';
import SingleItem from '../../components/SingleItem.js';
import filterItem from '../../lib/filterItem';
import filterAllItems from '../../lib/filterAllItems';
import { editHelper } from '../../lib/editItem';
import { clearLocal } from '../../lib/editItem';
import { loadConditions } from '../../actions/conditions';
import { loadCategories } from '../../actions/categories';


class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      item: '',
      auth: localStorage.auth,
      edit: false
    }

    this.closeEdit = this.closeEdit.bind(this);

  }

  editNow(item,e){
    let editedItem = editHelper(e);
    this.setState({
      item: item,
      edit: true
    });

    if(this.state.edit){
      console.log(this.state.item)
      editedItem.id = item[0].id;
      this.props.editItem(editedItem);
      this.setState({item: null, edit: false});
    }
  }

  closeEdit(event){
    this.setState({
      item: null,
      edit: false
    });
  }

  componentWillMount(){
    this.props.loadItems();
    this.props.loadCategories();
    this.props.loadConditions();
  }

  loadSingleItem(id,e){
    this.setState({
      item: filterAllItems(this.props.items,id)
    });
  }

  backToItems(e){
    e.preventDefault();
    this.setState({
      item: null,
      edit: false
    });
  }


  render(){
    console.log(localStorage.getItem('auth'));
    const item = this.state.item;
    const id = localStorage.getItem('userId');
    return(
      <div>

       {item ?
        <SingleItem
          edit={this.state.edit}
          auth={this.state.auth}
          item={this.state.item}
          editNow={this.editNow.bind(this)}
          backToItems={this.backToItems.bind(this)}
          categories={this.props.categories}
          conditions={this.props.conditions}
          itemStatuses={this.props.itemStatuses}
          closeEdit={this.closeEdit}
        />
        :
        <div>
          <h1> PUBLISHED </h1>
          <ItemStatusList loadSingleItem={this.loadSingleItem.bind(this)} items={this.props.items} statusId={2} currentUserId = {id}/>
          <h1> SOLD ITEMS  </h1>
          <ItemStatusList loadSingleItem={this.loadSingleItem.bind(this)} items={this.props.items} statusId={1} currentUserId = {id}/>
        </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    items: filterItem(state.items,localStorage.getItem('userId')),
    categories: state.categories,
    conditions: state.conditions,
    itemStatuses: state.itemStatuses
  }
}

const ConnectedDashboard = connect(
  mapStateToProps,
  {loadItems, editItem, loadCategories,loadConditions}
)(Dashboard)

export default ConnectedDashboard;