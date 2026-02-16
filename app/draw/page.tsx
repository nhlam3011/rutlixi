import React, { Suspense } from 'react'
import DrawClient from './Client'

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
      <DrawClient />
    </Suspense>
  )
}
