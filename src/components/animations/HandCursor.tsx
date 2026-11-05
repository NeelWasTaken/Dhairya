interface HandCursorProps {
  x: number
  y: number
  isDrawing: boolean
  visible: boolean
}

export default function HandCursor({ x, y, isDrawing, visible }: HandCursorProps) {
  if (!visible) return null

  return (
    <div
      className="fixed pointer-events-none z-[1000] select-none max-[768px]:hidden"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-5px, -3px)',
        transition: 'transform 0.05s ease-out',
      }}
      aria-hidden="true"
    >
      {isDrawing ? (
        /* Grabbing / Closed Fist Cursor */
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        >
          {/* Fist Outline & White Fill */}
          <path
            d="M5 11 C5 9 7 8 9 8 C9.5 8 10 8.2 10.5 8.6 C11 8.2 11.6 8 12.2 8 C12.8 8 13.4 8.2 13.8 8.6 C14.3 8.2 15 8 15.6 8 C17 8 18 9 18 10.5 L18 14 C18 17 15.5 19 12 19 C8.5 19 5 17 5 14 Z"
            fill="#FFFFFF"
            stroke="#161224"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Curled Knuckles */}
          <path d="M9 8.5 L9 13" stroke="#161224" strokeWidth="1.2" />
          <path d="M12 8.5 L12 13" stroke="#161224" strokeWidth="1.2" />
          <path d="M15 8.5 L15 13" stroke="#161224" strokeWidth="1.2" />
          {/* Thumb Curled Over */}
          <path
            d="M5.5 12.5 C6 14 7.5 15 9.5 15"
            fill="none"
            stroke="#161224"
            strokeWidth="1.4"
          />
        </svg>
      ) : (
        /* Open Hand Cursor (matches draw-screen.png) */
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
        >
          {/* 4 Fingers + Thumb Outline and White Fill */}
          <path
            d="M7 10 L7 4 C7 2.8 8 2 9 2 C10 2 11 2.8 11 4 L11 8.5 M11 4 C11 2.8 12 2 13 2 C14 2 15 2.8 15 4 L15 8.5 M15 5 C15 3.8 16 3 17 3 C18 3 19 3.8 19 5 L19 10 M7 9 L7 8 C7 6.8 6 6 5 6 C4 6 3 6.8 3 8 L3 13 C3 18 6.5 21 11.5 21 C16.5 21 20 18 20 13 L20 9.5"
            fill="#FFFFFF"
            stroke="#161224"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Palm Crease Details */}
          <path d="M7 13 C9 15 13 15 16 13" fill="none" stroke="#161224" strokeWidth="1.2" />
          <path d="M8 16 C10 17.5 13 17.5 15 16" fill="none" stroke="#161224" strokeWidth="1.0" />
        </svg>
      )}
    </div>
  )
}
