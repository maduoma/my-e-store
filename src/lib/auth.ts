// src/lib/auth.ts
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secretKey)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    return null
  }
}