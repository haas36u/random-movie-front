import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, injectTooltip } from 'react-md';

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '1em',
  },
};

/**
 * Starting with React 16, Stateless functions can not have refs, so need to create
 * a component class to work as expected.
 */
class TooltipIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
    tooltip: PropTypes.node
  };

  render() {
    const {children, icon, tooltip } = this.props;
    return (
      <div style={styles.tooltipContainer}>
        {tooltip}
        {children}
      </div>
    );
  }
}

export default injectTooltip(TooltipIcon);