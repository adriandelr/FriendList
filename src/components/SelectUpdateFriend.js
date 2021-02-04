import React from "react";

export class SelectUpdateFriend extends React.Component {
  handleSelectUpdate = event => {
    if (this.props.value) {
      this.props.selectUpdateFriend(this.props.value);
    }
    event.preventDefault();
  };

  render() {
    return (
      <button onClick={this.handleSelectUpdate} value={this.props.value}>
        Update
      </button>
    );
  }
}
