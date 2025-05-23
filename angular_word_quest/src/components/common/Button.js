import React from 'react';

/**
 * Button component with consistent styling and variants
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant ('primary', 'secondary', 'danger')
 * @param {string} [props.size='medium'] - Button size ('small', 'medium', 'large')
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  children,
  ...rest
}) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `btn-${variant}`,
    `btn-${size}`,
  ].join(' ');

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
