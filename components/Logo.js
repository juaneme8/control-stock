import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg viewBox="0 0 28.35 28.35" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.17 28.35C6.36 28.35 0 21.99 0 14.17 0 6.36 6.36 0 14.17 0c7.82 0 14.17 6.36 14.17 14.17.01 7.82-6.35 14.18-14.17 14.18zm0-27.48C6.83.87.86 6.84.86 14.18c0 7.34 5.97 13.31 13.31 13.31 7.34 0 13.31-5.97 13.31-13.31C27.48 6.84 21.51.87 14.17.87z"
        fill={props.borderColor}
      />
      <circle cx={14.17} cy={6.2} fill="#0baeda" r={1.99} />
      <circle cx={18.16} cy={10.18} fill="#0b6bb4" r={1.99} />
      <circle cx={10.18} cy={10.18} fill="#e81d2a" r={1.99} />
      <circle cx={14.17} cy={22.15} fill="#f36f26" r={1.99} />
      <circle cx={6.2} cy={14.17} fill="#6d2a80" r={1.99} />
      <circle cx={22.15} cy={14.17} fill="#0e7f6a" r={1.99} />
      <circle cx={18.16} cy={18.16} fill="#fcba27" r={1.99} />
      <circle cx={10.18} cy={18.16} fill="#ffd10a" r={1.99} />
    </svg>
  );
}

export default SvgComponent;
