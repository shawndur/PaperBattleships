import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless funtional component that displays a message
 * @param {*} props 
 */
const MessageBox = (props) => {
    return <h3>{props.message}</h3>;
};

MessageBox.propTypes = {
    message: PropTypes.string
};

export default MessageBox;