import { nanoid } from 'nanoid/non-secure'

const config = {
  selector: `vue-portal-target-${nanoid()}`,
}
export default config

export const setSelector = selector => (config.selector = selector)

export const isBrowser =
  typeof window !== 'undefined' && typeof document !== undefined
