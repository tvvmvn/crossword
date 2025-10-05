// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  const { email } = req.body
  console.log('new subscribe:', email)

  // save an email in db..

  res.status(200).json({ message: 'done' });
}
