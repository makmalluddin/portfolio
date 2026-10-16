function Button({ children, className = "", ...restProps }) {
  return (
    <div className={`hover:bg-text-primary hover:text-white cursor-pointer ${className}`} {...restProps}>
      {children}
    </div>
  )
}

export default Button
