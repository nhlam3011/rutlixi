import React, { Suspense } from 'react'
import ResultClient from './Client'

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
      <ResultClient />
    </Suspense>
  )
}
