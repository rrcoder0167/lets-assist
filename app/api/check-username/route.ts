import { NextResponse } from 'next/server'
import { checkUsernameUnique } from '@/app/setup/actions'

// Modified export for GET request as an arrow function
export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    const result = await checkUsernameUnique(username)
    console.log(result)
    return NextResponse.json(result)
}
