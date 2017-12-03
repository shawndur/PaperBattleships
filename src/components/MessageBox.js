import React from 'react';
import PropTypes from 'prop-types';

const MessageBox = (props) => {
    return <h3>{props.message}</h3>
}

MessageBox.propTypes = {
    message: PropTypes.string
}

export default MessageBox;