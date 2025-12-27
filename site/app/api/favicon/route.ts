import { NextResponse } from 'next/server'

export async function GET() {
  // Retourner une réponse 404 normale pour les requêtes favicon
  return new NextResponse(null, { status: 404 })
}