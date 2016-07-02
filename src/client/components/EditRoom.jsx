import React from 'react';
import ReactDom  from 'react-dom';
import BranchView from './BranchingView.jsx';
import Editor from './Editor.jsx';

export default class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    if(!props.room) {
      props.getRoom(props.params.roomid);
    }
    if(!props.user){
      props.getUser();
    }
    console.log('editroom');
    props.getBranches(props.params.roomid);
    props.initializeSocket();
  }

  render() {
    return (
      <div>
        <BranchView {...this.props} roomid={this.props.params.roomid}/>
        <Editor ui={this.props.ui} 
        commit={this.props.commit} 
        roomid={this.props.params.roomid}
        updateFile = {this.props.updateFile}
        listenToOutwardFileUpdate = {this.props.listenToOutwardFileUpdate}/>
      </div>
    )
  }
}