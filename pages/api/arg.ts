
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTemp } from '../../utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { url } = req.query
  if (Array.isArray(url) || !url) {
    return res.status(400).json({ error: 'invalid query' })
  }

  try {
    const temp = await getTemp(url)
    const data: string[] = []

    for (let index = 0, isScript = false; index < temp.length; index += 1) {
      let line = temp[index];
      if (line.startsWith('#')) {
        continue
      }
      if (isScript && /^\[/.test(line)) {
        isScript = false
      }
      if (line.includes('[Script]')) {
        isScript = true
      }
      if (!isScript) {
        continue
      }

      const argument = line.split(',').find(item => item.trim().startsWith('argument='))
      if (argument) {
        data.push(argument.trim().replace(/^argument=/, ''))
      }
    }

    res.status(200).json({ data })
  } catch (e) {
    const error = (e as Error).toString()
    return res.status(400).json({ error })
  }
}
