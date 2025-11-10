export default async function handler(req, res) {

  if (process.env.NODE_ENV == 'production') {
    const authHeader = req.headers['authorization']
    
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).send('Unauthorized')
    }
  }
 
  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/posts/[id]" this should be "/posts/1"
    await res.revalidate('/')

    return res.send('Done')

  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}