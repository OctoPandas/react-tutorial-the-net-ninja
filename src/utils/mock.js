import { nanoid } from 'nanoid';
import { rndPhr, rndSlug, rndAddr, rndName, http } from './index'

const blogs = new Array(4).fill().map(() => ({
  title: rndSlug(), body: rndPhr(), author: rndName(), id: nanoid()
}))

export const getBlogs = http(() => blogs)
