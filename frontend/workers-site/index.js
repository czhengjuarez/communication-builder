import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    // For SPA routing, serve index.html for non-asset requests
    if (e.status === 404 || e.status === 405) {
      try {
        return await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${url.origin}/index.html`, req),
        })
      } catch (e) {
        return new Response(`Error: ${e.message}`, { status: 500 })
      }
    }
    
    return new Response(`Error: ${e.message}`, { status: e.status || 500 })
  }
}
