export function lsKey(key) {
  return `nemesis_${key}`
}

export function getLocalStorage(key) {
  const value = localStorage.getItem(lsKey(key));
  return value && JSON.parse(value);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(lsKey(key), value);
}