import React, { Component } from 'react';

class ToogleSidebar extends Component {

     constructor(props){
        super(props)

        this.state = {
            isSidebarOn: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    //*Changing visibility of sidebar by clicikg on button*///
    handleClick(){
        this.props.sidebarVisibilityChange(!this.state.isSidebarOn);
        this.setState(state => ({
            isSidebarOn: !state.isSidebarOn
        }));
    }

    render(){
        return (
            <div className="container-fluid">
                <button type="button" id="toggleSidebarButton" className="toggle" onClick={this.handleClick}>
                    <i className="fas fa-align-left"></i>
                    <span>Toggle</span>
                </button>
            </div>
        );
    }
}

export default ToogleSidebar;