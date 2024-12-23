import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPER_URL!,
    process.env.NEXT_PUBLIC_SUPER_KEY!
  )
}
