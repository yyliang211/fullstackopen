/* eslint-disable react/prop-types */
export const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }

  return <div className={className}>{message}</div>;
};
