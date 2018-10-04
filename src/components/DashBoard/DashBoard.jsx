import React from 'react';
import styles from './DashBoard.scss';
import uuid from 'uuid/v4'

class KeyValue extends React.Component {
  state = {
    key: this.props.keyValue && this.props.keyValue.key !== undefined ? this.props.keyValue.key : '',
    value: this.props.keyValue && this.props.keyValue.value !== undefined ? this.props.keyValue.value : '',
    id: this.props.keyValue && this.props.keyValue.id !== undefined ? this.props.keyValue.id : uuid(),
  }

  handleChange = (e) =>{
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    // this runs onBlur and onSubmit
    this.props.onComplete(this.state);
  }

  handleDelete = () => {
    this.props.onDelete(this.state.id);
  }

  render() {
    return (
      <div className={styles.keyValueContainer}>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            name='key'
            placeholder='Key'
            value={this.state.key}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
          />
          <input 
            type='text'
            name='value'
            placeholder='Value'
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
          />
        </form>
        <button onClick={this.handleDelete} className={styles.deleteButton}>X</button> 
      </div>
    )
  }
}

const defaultData = {
    key: '',
    value: '',
    id: uuid(),
  }

class DashBoard extends React.Component {
  state = {
    data: [defaultData],
  }

  handleUpdateData = (keyValue) => {
    const newState = this.state.data;
    const newStateMapped = newState.map(item => {
      return item.id === keyValue.id ? keyValue : item;
    })
    this.setState({ data: newStateMapped })
  }

  handleDeleteItem = (identifier) => {
    const newState = this.state.data;
    const filteredData = newState.filter(item => {
      return item.id !== identifier;
    })
    this.setState({ data: filteredData });
  }

  handleAddForm = () => {
    const newDataSet = {key: '', value: '', id: uuid()}
    const newState = this.state.data;
    newState[newState.length] = newDataSet;
    this.setState({ data: newState });
  }

  handleSubmitData = () => {
    const dataOutput = {};
    this.state.data.map(item => {
        dataOutput[item.key] = item.value;
    })
    // We aren't handling duplicate keys...right now it's just overwriting it with the value. 
    return console.log(JSON.stringify(dataOutput));
  }

  render() {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.componentHeader}>
          <h2>DashBoard</h2>
        </div>
        <div className={styles.addNewContainer}>
          <h3>Add Key/Values Below</h3>
          <button className={styles.addNewButton} onClick={this.handleAddForm}>
            <h4>+</h4>
          </button>
        </div>
        {
          this.state.data.map(item => (
            <KeyValue
              key={item.id}
              keyValue={item}
              onComplete={this.handleUpdateData}
              onDelete={this.handleDeleteItem}
            />
          ))
        }
        <button className={styles.button} onClick={this.handleSubmitData}>Submit</button>
      </div>
    )
  }
}

export default DashBoard;
