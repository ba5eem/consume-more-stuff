import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadConditions } from '../../actions/conditions';
import { loadCategories } from '../../actions/categories';
import { loadItemStatuses } from '../../actions/itemStatuses';
import { editItemImage, deleteItem } from '../../actions/items';
import { editHelper } from '../../lib/editItem';
import Select from '../../components/Select';

class EditItemForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      file: '',
      imageUrl: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmitImage = this.handleSubmitImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e){
    editHelper(e);
  }

  handleChangeImage(event){
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  handleSubmitImage(event){
    event.preventDefault();

    let formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('id', this.props.id);
    this.props.editItemImage(formData);

    this.setState({
      file: '',
      imageUrl: ''
    })

    this.props.closeEdit();

    return false;
  }

  handleDelete(id, event){
    event.preventDefault();
    this.props.deleteItem(id);

    this.props.closeEdit();
  }



  render(){
    return (
      <div id="edit-item-form">
        <form>
          <h2>
            Modify item listing
          </h2>
          <br />

          Name:
          <br />
          <input type="text" placeholder={this.props.name} name="name" onChange={this.handleChange} />
          <br />
          <br />
          Status:
          <br />
          <Select name="status" handler={this.handleChange} list={this.props.itemStatuses} show="title"/>
          <br />
          <br />
          Description:
          <br />
          <textarea cols="50" rows="10" name="description" onChange={this.handleChange} defaultValue={this.props.description} />
          <br />
          <br />
          Price:
          <br />
          <input type="number" name="price" placeholder={this.props.price} onChange={this.handleChange} />
          <br />
          <br />
          Category:
          <br />
          <Select name="category" handler={this.handleChange} list={this.props.categories} show="title"/>
          <br />
          <br />
          Condition:
          <br />
          <Select name="condition" handler={this.handleChange} list={this.props.conditions} show="title"/>
          <br />
          <br />
          Manufacturer/Make:
          <br />
          <input type="text" name="manfucturer" placeholder={this.props.manufacturer} onChange={this.handleChange} />
          <br />
          <br />
          Model
          <br />
          <input type="text" name="model" placeholder={this.props.model} onChange={this.handleChange} />
          <br />
          <br />
          Dimensions:
          <br />
          <input type="text" name="dimensions" placeholder={this.props.dimensions} onChange={this.handleChange} />
          <br />
          <br />
          Notes:
          <br />
          <textarea cols="50" rows="10" name="notes" onChange={this.handleChange} defaultValue={this.props.notes} />
        </form>

        <form onSubmit={this.handleSubmitImage} >
          <h2>
            Upload new image
          </h2>
          <div className="img-container-large">
            <img alt='Preview' className="fullsize" src={this.state.imageUrl} />
          </div>
          <div className="select-save-buttons">
            <div className="select-image-button">
              <input type="file" accept="image/*" id="image-upload" placeholder="Select new image" onChange={this.handleChangeImage}/>
            </div>
            <div className="submit-changed-image">
              <input type="submit" className="button" value="Save image" />
            </div>
          </div>
          <br />
          <br />
        </form>
        <div className="delete-button">
          <h2>
            Delete listing
          </h2>
          <button onClick={(event)=>this.handleDelete(this.props.id, event)}>
            Delete Item
          </button>
        </div>

      </div>

  )}
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    categories: state.categories,
    conditions: state.conditions,
    itemStatuses: state.itemStatuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editItemImage: (image) => {
      dispatch(editItemImage(image))
    },
    deleteItem: (item) => {
      dispatch(deleteItem(item))
    }
  }
}

const ConnectedEditItemForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemForm)

export default ConnectedEditItemForm;