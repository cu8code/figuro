'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const router = useSearchParams()
  const message  = router.get('msg')

  return <p>{message || 'Sorry, something went wrong'}</p>
}

