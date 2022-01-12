import type { NextApiRequest, NextApiResponse } from 'next'
import { getTemp } from '../../utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { url, arg } = req.query
  if (Array.isArray(url) || !url) {
    return res.status(400).send('invalid query')
  }
  if (arg && !Array.isArray(arg)) {
    arg = [arg]
  }
  try {
    const temp = await getTemp(url)
    const result: string[] = []

    for (let index = 0, isScript = false, argIndex = 0; index < temp.length; index += 1) {
      let line = temp[index];
      if (line.startsWith('#')) {
        result.push(line)
        continue
      }

      if (isScript && /^\[/.test(line)) {
        isScript = false
      }
      if (line.includes('[Script]')) {
        isScript = true
      }
      if (!isScript) {
        result.push(line)
        continue
      }

      line = line.split(',').map(item => {
        if (item.trim().startsWith('argument=')) {
          const argument = `argument=${arg[argIndex] || arg[0]}`
          argIndex += 1
          return argument
        }
        return item.trim()
      }).join(', ')

      result.push(line)
    }

    res.status(200).send(result.join('\n'))
  } catch (e) {
    const error = (e as Error).toString()
    return res.status(400).send(error)
  }
}
