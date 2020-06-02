import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height:'695px', margin: '0', padding: '0'}}>
            {props.children}
        </div>
    );

};

export default Scroll;