import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadItems,editItem } from '../../actions/items';
import { loadConditions } from '../../actions/conditions';
import { loadCategories } from '../../actions/categories';
import ItemList from '../../components/ItemList';
import SingleItem from '../../components/SingleItem.js';
import filterItem from '../../lib/filterUser';
import editHelper from '../../lib/editItem';
import ItemStatusListView from '../ItemStatusListView';

class AllItemView extends Component {
  constructor(){
    super();

        this.state = {
          item: '',
          auth: true,
          edit: false
        }
  }

  handleChange(e){ editHelper(e); }

  editNow(item,e){
    let editedItem = editHelper(e);
    this.setState({item: item, edit: true});
    if(this.state.edit){
      console.log(item);
      editedItem.id = item[0].id;
      this.props.editItem(editedItem);
      this.setState({item: null, edit: false});
    }
  }

  componentWillMount(){
    this.props.loadItems();
    this.props.loadCategories();
    this.props.loadConditions();
  }

  loadSingleItem(id,e){ this.setState({item: filterItem(this.props.items,id)}); }

  backToItems(e){
    e.preventDefault();
    this.setState({item: null});
  }

  render(){
    const item = this.state.item;
    return(
      <div>

       {item ?
        <SingleItem

          edit={this.state.edit}
          auth={this.state.auth}
          item={this.state.item}
          editNow={this.editNow.bind(this)}
          handleChange={this.handleChange.bind(this)}
          backToItems={this.backToItems.bind(this)}
          categories={this.props.categories}
          conditions={this.props.conditions}
        />
        :
        <ItemList
          loadSingleItem={this.loadSingleItem.bind(this)}
          items={this.props.items}/>
        }

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    items: state.items,
    categories: state.categories,
    conditions: state.conditions
  }
}

const ConnectedAllItemView = connect(
  mapStateToProps,
  {loadItems,editItem,loadCategories,loadConditions}
)(AllItemView)

export default ConnectedAllItemView;