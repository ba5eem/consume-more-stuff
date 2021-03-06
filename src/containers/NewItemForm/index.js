import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../actions/items.js';
import { loadItemStatuses } from '../../actions/itemStatuses.js';
import { loadConditions } from '../../actions/conditions.js';
import { loadCategories } from '../../actions/categories.js';
import Select from '../../components/Select';


class NewItemForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
      manufacturer: '',
      model: '',
      dimensions: '',
      notes: '',
      category: '',
      condition: '',
      file: '',
      imageUrl: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeDimensions = this.handleChangeDimensions.bind(this);
    this.handleChangeNotes = this.handleChangeNotes.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeCondition = this.handleChangeCondition.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){

    this.props.loadConditions();
    this.props.loadCategories();
    this.props.loadItemStatuses();
  }

  handleChangeName(event){
    this.setState({
      name: event.target.value
    })
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

  handleChangeDescription(event){
    this.setState({
      description: event.target.value
    })
  }

  handleChangePrice(event){
    this.setState({
      price: event.target.value
    })
  }

  handleChangeManufacturer(event){
    this.setState({
      manufacturer: event.target.value
    })
  }

  handleChangeModel(event){
    this.setState({
      model: event.target.value
    })
  }

  handleChangeDimensions(event){
    this.setState({
      dimensions: event.target.value
    })
  }

  handleChangeNotes(event){
    this.setState({
      notes: event.target.value
    })
  }

  handleChangeCategory(event){
    this.setState({
      category: event.target.value
    })
  }

  handleChangeCondition(event){
    this.setState({
      condition: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    let formData = new FormData();

    formData.append('file', this.state.file);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('manufacturer', this.state.manufacturer);
    formData.append('model', this.state.model);
    formData.append('dimensions', this.state.dimensions);
    formData.append('notes', this.state.notes);
    formData.append('category', this.state.category || 1);
    formData.append('condition', this.state.condition || 1);


    this.props.addItem(formData);

    this.setState({
      name: '',
      description: '',
      price: '',
      manufacturer: '',
      model: '',
      dimensions: '',
      notes: '',
      category: '',
      condition: '',
      file: '',
      imageUrl: ''
    });
    this.props.history.push("/items")
  }



  render(){
    return (
      <div id="new-item-form">
        <form onSubmit={this.handleSubmit}>
        <h1>ADD NEW ITEM</h1>
          <div id="item-form-left">
            <div id="upload-image-form">
            <label for="image-upload">Upload photo:</label>
            <br />
              <input type="file" accept="image/*" id="image-upload" placeholder="Image" onChange={this.handleChangeImage}/>
            </div>
            <br />
            <label for="name">Item name:</label> <input type="text" id="name" value={this.state.name} onChange={this.handleChangeName}/>
            <br/>
            <br/>
            <label for="description">Description:</label>
            <br/>
            <textarea cols="50" rows="10" id="description" value={this.state.description} onChange={this.handleChangeDescription} />
            <br/>
            <br/>

            <label for="price">Price:</label> <input type="text" id="price" value={this.state.price} onChange={this.handleChangePrice}/>
            <br/>
            <br/>
            Category: <Select name="category" handler={this.handleChangeCategory} list={this.props.categories} show="title" />
            <br/>
            <br/>
            Condition: <Select name="condition" handler={this.handleChangeCondition} list={this.props.conditions} show="title" />
            <br/>
            <br/>
            <label for="manufacturer">Manufacturer/Make:</label> <input type="text" id="manufacturer" value={this.state.manufacturer} placeholder="(optional)" onChange={this.handleChangeManufacturer}/>
            <br/>
            <br/>
            <label for="model">Model:</label> <input type="text" id="model" value={this.state.model} placeholder="(optional)" onChange={this.handleChangeModel}/>
            <br/>
            <br/>
            <label for="dimensions">Dimensions:</label> <input type="text" id="dimensions" value={this.state.dimensions} placeholder="(optional)" onChange={this.handleChangeDimensions}/>
            <br/>
            <br/>
            <label for="notes">Any other specifications or notes:</label>
            <br/>
            <textarea cols="50" rows="10" id="notes" value={this.state.notes} onChange={this.handleChangeNotes} />

            <br/>
            <input type="submit" className="button" value="Add my item to the marketplace!"/>
          </div>
        </form>

        <div id="item-form-right">
          <label for="image-upload">
            <div id="uploaded-image-preview">
              <img id="preview" alt="preview" src={this.state.imageUrl} />
            </div>
          </label>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    categories: state.categories,
    conditions: state.conditions,
    itemStatuses: state.itemStatuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item))
    },
    loadConditions: () => {
      dispatch(loadConditions())
    },
    loadCategories: () => {
      dispatch(loadCategories())
    },
    loadItemStatuses: () => {
      dispatch(loadItemStatuses())
    }
  }
}

const ConnectedNewItemForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewItemForm);

export default ConnectedNewItemForm;