import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const LOCAL_CONFIG = {
  ENABLE_LIGATURES: false,
}

// Make sure the font exists in the specified path:
const font = fetch(
  new URL('../../assets/FiraCode-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const fontData = await font

  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'My default title'

    // ?color=<color>
    const hasColor = searchParams.has('color')
    const color = hasColor ? searchParams.get('color') : '#ffffff'

    // ?date=<date>
    const hasDate = searchParams.has('date')
    const date = hasDate ? searchParams.get('date') : ''

    // ?reading-time=<reading-time>
    const hasReadingTime = searchParams.has('reading-time')
    const readingTime = hasReadingTime ? searchParams.get('reading-time') : ''

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            border: `8px solid ${color}`,
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            fontFamily: 'Fira Code',
            fontVariantLigatures: 'normal',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              width: '100%',
              fontFamily: 'Fira Code',
              fontSize: 88,
              fontStyle: 'normal',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: 'white',
              padding: '42px 56px 0',
              display: 'flex',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>

          <div
            style={{
              width: '100%',
              padding: '0 56px 42px',
              display: 'flex',
              fontSize: 36,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              whiteSpace: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {date}
              {hasReadingTime
                ? ` ${
                    LOCAL_CONFIG.ENABLE_LIGATURES ? `->` : ' - '
                  } ${readingTime}`
                : ''}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <svg
                fill='#ffffff'
                style={{
                  height: '56px',
                  width: '86.39px',
                }}
                viewBox='0 0 350 226.86'
              >
                <g>
                  <path d='M106.94,22.24,19.24,59l87.7,37v22.24L0,71.71V46.48L106.94,0Z'></path>
                  <path d='M243.06,204.62l87.7-36.73-87.7-37V108.67L350,155.15v25.24L243.06,226.86Z'></path>
                  <path d='M242.6,0Q151.42,151.75,136.33,178.45t-15.09,35.39q0,9.77,8.26,9.77,18.25,0,67-68.93,1.08-2.17,2.61-2.17a1.16,1.16,0,0,1,.87,1.3q0,1.3-2.17,3.47l-9.35,12.83q-41.09,56.74-60.64,56.74a19.19,19.19,0,0,1-15.32-7.06q-6-7.06-6-17.91A51.52,51.52,0,0,1,112,178.78q5.54-11.18,37.67-64.59Q189,48.85,215.89.87Z'></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 620,
        fonts: [
          {
            name: 'Fira Code',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
