import StudioAuth from "@/components/studio/studio-auth"

// Simple server-side auth check
async function checkAuth() {
  // In a real app, you'd check cookies/session here
  // For now, we'll handle auth on the client side
  return false
}

export default async function StudioPage() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return <StudioAuth />
  }

  // This will be handled by client-side auth for now
  return <StudioAuth />
}
