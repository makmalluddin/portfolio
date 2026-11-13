import React from "react"

function MainFrame({ title, children, className = "", ...restProps }) {
  const childArray = React.Children.toArray(children)

  return (
    <div className="flex justify-center border-b border-border-muted" {...restProps}>
      <div className="flex flex-col w-full max-w-7xl">
        {title && (
          <div className="border-x border-b border-border-muted px-8 py-4">
            {title}
          </div>
        )}

        {childArray.map((child, index) => (
          <div
            key={index}
            className={`border-x border-border-muted ${index > 0 ? "border-t" : ""} ${className}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainFrame
