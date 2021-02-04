import React from "react";
import $ from "jquery";

export class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recent_id: 10, name: "", phone: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    this.setState({ recent_id: this.state.recent_id + 1 });
    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/users/",
      data: {
        id: this.state.recent_id + 1,
        name: this.state.name,
        phone: this.state.phone,
      },
      success: function (data) {
        this.props.updateList(data);
        this.setState({ name: "", phone: "" });
        console.log("Friend Added Successfully!");
      }.bind(this),
    });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="div-name">
          <label>
            Name:{" "}
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="div-phone">
          <label>
            Phone:{" "}
            <input
              name="phone"
              type="text"
              pattern="[0-9\s]+"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="div-submit">
          <input type="submit" value="Add Friend" />
        </div>
      </form>
    );
  }
}
