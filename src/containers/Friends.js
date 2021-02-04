import React from "react";
import $ from "jquery";
import { AddFriend } from "../components/AddFriend";
import { DeleteFriend } from "../components/DeleteFriend";
import { SelectUpdateFriend } from "../components/SelectUpdateFriend";
import { UpdateFriend } from "../components/UpdateFriend";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);

    this.updateList = this.updateList.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.selectUpdateFriend = this.selectUpdateFriend.bind(this);

    this.state = {
      friends: [],
      isUpdating: false,
      selected_obj: null,
    };
  }

  updateList(data) {
    if (this.state.isUpdating) {
      const friends = this.state.friends;
      friends.map(function (friend) {
        return friend.id === data.id
          ? ((friend.name = data.name), (friend.phone = data.phone))
          : null;
      });
      this.setState({ friends, isUpdating: false });
    } else {
      this.state.friends.unshift(data);
      this.setState({ isUpdating: false });
    }
  }

  deleteFriend(obj) {
    if (obj === this.state.selected_obj) {
      if (this.refs.child !== undefined) {
        this.refs.child.clearFields();
      }
    }
    this.setState({
      friends: this.state.friends.filter(function (friend) {
        return friend !== obj;
      }),
    });
  }

  selectUpdateFriend(obj) {
    this.setState({ isUpdating: true, selected_obj: obj });
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: this.props.api,
      success: function (res) {
        const friends = res.reverse();
        friends.map(function (friend) {
          return (friend.phone = friend.phone.replace(/[^0-9 ]+/g, ""));
        });
        this.setState({ friends });
        $("main").css("visibility", "visible");
        $("footer").css("visibility", "visible");
        $(".fa-spin").css("display", "none");
      }.bind(this),
    });
  }

  render() {
    return (
      <div className="friends-list">
        <div className="text-friends-counter">
          You have <b>{this.state.friends.length} friends</b> in your list.
        </div>
        {this.state.isUpdating ? (
          <UpdateFriend
            updateList={this.updateList}
            arrayLength={this.state.friends.length}
            value={this.state.selected_obj}
            ref="child"
          />
        ) : (
          <AddFriend
            updateList={this.updateList}
            arrayLength={this.state.friends.length}
          />
        )}
        {this.state.friends.map((friend) => (
          <div className="row-friends" key={friend.id}>
            <div className="text-name">
              <b>Name: </b>
              {friend.name}
            </div>
            <div className="text-phone">
              <b>Phone: </b>
              {friend.phone}{" "}
            </div>
            <div className="btn-group">
              <SelectUpdateFriend
                selectUpdateFriend={this.selectUpdateFriend}
                value={friend}
              />
              <DeleteFriend deleteFriend={this.deleteFriend} value={friend} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const api = "https://jsonplaceholder.typicode.com/users";
export const Friends = () => (
  <div>
    <h2>Friends List</h2>
    <FriendsList api={api} />
    <footer>
      <span>
        For demo purpose only. Built by Adrian Cruz Del Rosario using ReactJS.
      </span>
    </footer>
  </div>
);
