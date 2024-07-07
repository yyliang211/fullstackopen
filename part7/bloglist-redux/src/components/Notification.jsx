import PropTypes from "prop-types";

export const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};
