import React from "react";
import $ from "jquery";

export class DeleteFriend extends React.Component {
  handleDelete = event => {
    if (this.props.value.id <= 10) {
      $.ajax({
        type: "DELETE",
        url: "http://jsonplaceholder.typicode.com/users/" + this.props.value.id,
        success: function() {
          this.props.deleteFriend(this.props.value);
          console.log("Friend Deleted Successfully!");
        }.bind(this)
      });
    } else {
      this.props.deleteFriend(this.props.value);
      console.log("Friend Deleted Successfully!");
    }
    event.preventDefault();
  };

  render() {
    return (
      <button onClick={this.handleDelete} value={this.props.value}>
        Delete
      </button>
    );
  }
}
