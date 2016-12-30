import React, { Component } from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
    // all meteor method can add last callback to handle error
    Meteor.call('links.insert', this.refs.link.value, (error) => {
      if(error) {
        this.setState({ error: 'Enter a valid URL' });
      } else {
        // clear the error msg
        this.setState({ error: '' });
        this.refs.link.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label>Link to shorten</label>
          <input className='form-control' ref='link' />
        </div>
        <div className='text-danger'>{this.state.error}</div>
        <button className='btn btn-primary'>Shorten!</button>
      </form>
    );
  }
}

export default LinkCreate;
