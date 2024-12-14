import { client, getStatsLatest } from '@/api/sdk.gen'
import { getI18NObject } from '~/i18n'

client.setConfig({
  baseUrl: 'https://test.codetime.dev',
})

export default defineEventHandler(async (event) => {
  // make a svg response
  const query = getQuery(event)

  const resp = await getStatsLatest({
    query: {
      uid: query.uid as number,
    },
  })

  const { data } = resp
  if (!data) {
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" style="width: auto; height: 28px;">
  <g transform="translate(4, 4)">
    <g>
      <circle cx="10" cy="10" r="4" fill="gray" /> 
    </g>
    <text x="25" y="15" font-size="12">Not coding</text> 
  </g>
</svg>`
      , {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      },
    )
  }

  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" style="width: auto; height: 28px;">
  <g transform="translate(4, 4)">
    <g>
      <circle cx="10" cy="10" r="4" fill="blue" /> 
      <circle cx="10" cy="10" r="4" fill="blue">
        <animate attributeName="r" from="5" to="10" dur="1s" repeatCount="indefinite" /> 
        <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" /> 
      </circle>
    </g>
    <image href="/_ipx/_/vscode-icons/vscode-icons_file-type-go.svg" x="25" y="0" width="20" height="20" />
    <text x="50" y="15" font-size="12">Working on ${data.project}</text>
  </g>
</svg>`
    , {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    },
  )
})
