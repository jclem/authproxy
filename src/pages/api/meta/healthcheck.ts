import {NextApiHandler} from 'next'

const healthcheck: NextApiHandler = async (req, res) => {
  return res.end('ok')
}

export default healthcheck
