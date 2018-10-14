import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ToogleSidebar extends Component {
    
     constructor(props){
        super(props)
        
        this.state = {
            isSidebarOn: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.props.sidebarVisibilityChange(!this.state.isSidebarOn);
        this.setState(state => ({
            isSidebarOn: !state.isSidebarOn
        }));        
    }

    render(){
        return (
            <div className="container-fluid">
                <button type="button" id="toggleSidebarButton" className="btn btn-info" onClick={this.handleClick}>
                    <i className="fas fa-align-left"></i>
                    <span>Toggle</span>
                </button>
            </div>
          
        );
    }
}

export default ToogleSidebar;