/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/": `/`,
  "/admin": `/admin`,
  "/login": `/login`,
  "/basecolors": `/basecolors`,
  "/design-system/buttons": `/design-system/buttons`,
  "/contact-us": `/contact-us`,
  "/privacy-policy": `/privacy-policy`,
  "/term-of-service": `/term-of-service`,
  "/[user_id]": (params: { user_id: (string | number) }) => {
    return `/${params['user_id']}`
  },
  "/[user_id]/service": (params: { user_id: (string | number) }) => {
    return `/${params['user_id']}/service`
  },
  "/services/[service]": (params: { service: (string | number) }) => {
    return `/services/${params['service']}`
  },
  "/services/[service]/[service_provider_id]": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}`
  },
  "/services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests`
  }
}

/**
 * SERVERS
 */
const SERVERS = {
  "POST /api/v1/image": `/api/v1/image`,
  "DELETE /api/v1/image": `/api/v1/image`,
  "POST /api/v1/push/send": `/api/v1/push/send`,
  "POST /api/v1/push/subscribe": `/api/v1/push/subscribe`,
  "POST /api/v1/push/unsubsribe": `/api/v1/push/unsubsribe`,
  "GET /login/google": `/login/google`,
  "GET /login/google/callback": `/login/google/callback`
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "logout /": `/?/logout`,
  "default /admin": `/admin`,
  "default /[user_id]": (params: { user_id: (string | number) }) => {
    return `/${params['user_id']}`
  },
  "newschedule /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/newschedule`
  },
  "unbookappointment /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/unbookappointment`
  },
  "bookappointment /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/bookappointment`
  },
  "create /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/create`
  },
  "update /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/update`
  },
  "withdraw /services/[service]/[service_provider_id]/requests": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/requests?/withdraw`
  },
  "subscribe /services/[service]/[service_provider_id]/subscription": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/subscription?/subscribe`
  },
  "unsubscribe /services/[service]/[service_provider_id]/subscription": (params: { service: (string | number), service_provider_id: (string | number) }) => {
    return `/services/${params['service']}/${params['service_provider_id']}/subscription?/unsubscribe`
  }
}

/**
 * LINKS
 */
const LINKS = {
  
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (
  sp?: Record<string, ParamValue | ParamValue[]>,
  prefix: '?' | '&' = '?',
) => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  let anchor = ''
  for (const [name, val] of Object.entries(sp)) {
    if (name === '__KIT_ROUTES_ANCHOR__' && val !== undefined) {
      anchor = `#${val}`
      continue
    }
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted || anchor) {
    return `${prefix}${formatted}${anchor}`.replace('?#', '#')
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

/* type helpers for route function */
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

export type Routes = keyof AllTypes extends `${string}/${infer Route}` ? `/${Route}` : keyof AllTypes
export const routes = [
	...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[]

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from '$lib/ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/': never, '/admin': never, '/login': never, '/basecolors': never, '/design-system/buttons': never, '/contact-us': never, '/privacy-policy': never, '/term-of-service': never, '/[user_id]': 'user_id', '/[user_id]/service': 'user_id', '/services/[service]': 'service', '/services/[service]/[service_provider_id]': 'service' | 'service_provider_id', '/services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id' }
  SERVERS: { 'POST /api/v1/image': never, 'DELETE /api/v1/image': never, 'POST /api/v1/push/send': never, 'POST /api/v1/push/subscribe': never, 'POST /api/v1/push/unsubsribe': never, 'GET /login/google': never, 'GET /login/google/callback': never }
  ACTIONS: { 'logout /': never, 'default /admin': never, 'default /[user_id]': 'user_id', 'newschedule /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'unbookappointment /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'bookappointment /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'create /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'update /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'withdraw /services/[service]/[service_provider_id]/requests': 'service' | 'service_provider_id', 'subscribe /services/[service]/[service_provider_id]/subscription': 'service' | 'service_provider_id', 'unsubscribe /services/[service]/[service_provider_id]/subscription': 'service' | 'service_provider_id' }
  LINKS: Record<string, never>
  Params: { 'user_id': never, 'service': never, 'service_provider_id': never }
}
