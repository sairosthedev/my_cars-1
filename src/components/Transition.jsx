import { useEffect, useState } from 'react'

export function Transition({ children, show }) {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) setRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setRender(false)
  }

  return (
    render && (
      <div
        className={`transition-all duration-300 ease-in-out ${
          show ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
        }`}
        onTransitionEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  )
}