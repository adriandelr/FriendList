import React from "react";
import $ from "jquery";

export class UpdateFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.value.name,
      phone: this.props.value.phone,
      isDeleting: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isDeleting) {
      this.setState({
        name: "",
        phone: "",
        isDeleting: false
      });
    } else {
      this.setState({
        name: nextProps.value.name,
        phone: nextProps.value.phone,
        isDeleting: false
      });
    }
  }

  clearFields = event => {
    this.setState({
      isDeleting: true
    });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    const newProps = {
      id: this.props.value.id,
      name: this.state.name,
      phone: this.state.phone
    };
    if (this.props.value.id <= 10) {
      $.ajax({
        type: "PUT",
        data: {
          name: this.state.name,
          phone: this.state.phone
        },
        url: "http://jsonplaceholder.typicode.com/users/" + this.props.value.id,
        success: function() {
          this.props.updateList(newProps);
          console.log("Friend Updated Successfully!");
        }.bind(this)
      });
    } else {
      this.props.updateList(newProps);
      console.log("Friend Updated Successfully!");
    }
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="div-name">
          Name:{" "}
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label className="div-phone">
          Phone:{" "}
          <input
            name="phone"
            type="text"
            pattern="[0-9\s]+"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Update Friend" />
      </form>
    );
  }
}
