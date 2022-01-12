import fetch from 'node-fetch'
import { URL } from 'url'

export const getTemp = async (url: string) => {
  const temp = await fetch(new URL(url).toString()).then(response => response.text())
  return temp.split('\n')
}