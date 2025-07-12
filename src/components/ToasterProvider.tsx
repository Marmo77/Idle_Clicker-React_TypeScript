'use client'

import { Toaster } from 'react-hot-toast'

export const ToasterProvider = () => {
  return <Toaster
    position="bottom-center"
    containerStyle={{
        zIndex: 9999,
        bottom: '2rem',
    }}
    toastOptions={{
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #374151'
      },
      success: {
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff'
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff'
        }
      }
    }}
  />
}