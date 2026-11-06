import { Component } from 'react';
import PropTypes from 'prop-types';
import StatusPage from './StatusPage';

// If rendering throws, show a friendly page with a retry instead of a blank
// screen. This is the in-browser counterpart of a 500.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Keep the details in the console for debugging
    console.error(error, info.componentStack); // eslint-disable-line no-console
  }

  render() {
    const { failed } = this.state;
    const { children } = this.props;
    return failed ? <StatusPage kind="error" /> : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
