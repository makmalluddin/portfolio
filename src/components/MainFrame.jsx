function MainFrame({ title, content, className = "", ...restProps }) {
  return (
    <div className="flex justify-center border-b border-border-muted" {...restProps}>
      <div className="flex flex-col w-full max-w-7xl">
        {title && (
          <div className={`border-x border-border-muted px-8 py-2`}>
            {title}
          </div>
        )}
        <div className={`border-x border-t border-border-muted px-8 py-2 ${className}`}>
          {content}
        </div>
      </div>
    </div>
  )
}

export default MainFrame
