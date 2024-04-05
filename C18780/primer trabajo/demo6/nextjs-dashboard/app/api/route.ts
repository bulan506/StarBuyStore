export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const res = await fetch(request, {
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
    })
    const product = await res.json()

    return Response.json({ product })
}

export async function POST(request: Request) {
    const res = await fetch(request, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ time: new Date().toISOString() }),
    })

    const data = await res.json()

    return Response.json(data)
}