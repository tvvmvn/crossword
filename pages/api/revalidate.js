export default async function handler(req, res) {

  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

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

    return res.json({ revalidated: true })

  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}