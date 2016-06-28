import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default class BranchingView extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();
    this.roomid = this.props.roomid;
    props.getBranches(this.roomid);
    this.props.getCommits(this.roomid);
    this.props.showBranches(true);
   
    this.clickBranch = this.clickBranch.bind(this);
    this.clickCommit = this.clickCommit.bind(this);
    this.clickFile = this.clickFile.bind(this);
    this.getFileTree = this.props.getFileTree.bind(this);
    this.clickFolder = this.clickFolder.bind(this);
    this.clickBackButton = this.clickBackButton.bind(this);
  }

  clickBranch() {
    this.props.showBranches(false);
    this.props.showCommits(true);
    this.props.showFileStructure(false, null);
  }

  clickCommit (event) {
    this.getFileTree(this.roomid, event.target.value);
    this.props.showBranches(false);
    this.props.showCommits(false);
    this.props.showFileStructure(true, event.target.value); 
  }

  clickFile(event) {
<<<<<<< 8ee444628c5f7d86aaea118e9b5bc66f251a1bb9
    this.props.getFile(this.roomid, this.props.ui.currentCommitSha, event.target.value);
=======
    this.props.getFile(this.props.params.roomid, this.props.ui.currentCommitSha, event.target.value);
  }

  clickFolder (event) {
    console.log('inside click folder', event.target.value);
  }

  clickBackButton () {
    console.log('back button clicked');
    console.log('sidebarstack is', this.props.ui.sidebarStack);
    console.log('the length of the sidebar stack is now', this.props.ui.stackLength);
    for (var i = 0; i < 3; i++) {
      this.props.ui.sidebarStack.pop();
    }
    console.log('the length of the sidebar stack after looping is', this.props.ui.stackLength);
  }
 
  componentWillReceiveProps(newProps) {
    console.log('Just received new props!');
>>>>>>> Add children array to each element in fileTree props in branching view
  }

  clickFolder (event) {
    this.props.getFileTreeRecursively(this.props.location.pathname.split('/')[2], event.target.value);
  }

  clickBackButton () {
    console.log('back button clicked');
    console.log('sidebarstack is', this.props.ui.sidebarStack);
    console.log('the length of the sidebar stack is now', this.props.ui.stackLength);
    for (var i = 0; i < 3; i++) {
      this.props.ui.sidebarStack.pop();
    }
    console.log('the length of the sidebar stack after looping is', this.props.ui.stackLength);
  }

  render() {
    var showProperties = this.props.ui.sidebarStack;
    if (showProperties.length === 0 || (showProperties[0].display && showProperties.length === 1) || (showProperties[showProperties.length - 3].display && showProperties.length > 1)) {
      return (
        <div>
          {this.props.branches.map((branchObj) => {
            return (
              <h3 onClick={this.clickBranch}>{branchObj.name}</h3>
            )
           })}
        </div>
      )
    } else if (showProperties[showProperties.length - 2].display && showProperties.length >= 2) {
      return (
        <div>
          <button onClick={this.clickBackButton}>Back</button>
          {this.props.commits.map((commitObj, index) => {
            return (
              <h4 key={index} onClick={this.clickCommit} value={commitObj.sha}>{commitObj.commit.message}</h4>
            )
          })}
        </div>
      )
    } else {
      console.log('the filetree looks like:', this.props.fileTree);
      return (
        <div>
          <a href="/logout"><button type="button">Sign out</button></a>
          <button onClick={this.clickBackButton}>Back</button>
<<<<<<< 8ee444628c5f7d86aaea118e9b5bc66f251a1bb9
          <FileTreeView {...this.props} sha={this.state.sha} recursiveFileTree={this.props.getFileTreeRecursively} fileTree={this.props.fileTree}/>
=======
          {this.props.fileTree.fileData.map((fileObj, index) => {
            console.log('the filetree looks like:', this.props.fileTree);
            console.log('fileobj is', fileObj);
            if (fileObj.type === 'tree') {
              return (
                <div key={index} onClick={this.clickFolder} value={fileObj.sha}>
                  <i value={fileObj.sha} className="fa fa-folder-open" aria-hidden="true"></i>
                  <h5 value={fileObj.sha}>{fileObj.path}</h5>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <i className="fa fa-file-code-o" aria-hidden="true"></i>
                  <h5>{fileObj.path}</h5>
                </div>
              ); 
            }
          })}
>>>>>>> Add children array to each element in fileTree props in branching view
        </div>
      );
    } 
  }
}

