function get(key: string): Promise<unknown> {
  try {
    const raw = window.localStorage.getItem(key)
    return Promise.resolve(raw === null ? undefined : JSON.parse(raw))
  } catch (err) {
    return Promise.reject(err)
  }
}

function set(key: string, value: unknown): Promise<void> {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

if (!window.storage) {
  window.storage = { get, set }
}
