import fs from 'fs'
import { resolve } from 'path'

export async function* getFiles(dir: string): AsyncGenerator<string> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const res = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}
