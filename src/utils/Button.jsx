import { Link } from 'react-router-dom'

function Button({ type, href, children, className = "", ...restProps }) {
  const isLight = type === 'light'

  return (
    <Link
      to={href || '#'}
      className={`inline-flex items-center justify-center font-mono font-medium py-3 px-6 tracking-wider text-sm border border-border-bold cursor-pointer transition-colors 
      ${isLight
          ? 'text-text-primary bg-bg-primary hover:bg-text-primary hover:text-white'
          : 'text-white bg-text-primary hover:bg-text-primary/70 hover:text-white'
        } ${className}`}
      {...restProps}
    >
      {children}
    </Link>
  )
}

export default Button
