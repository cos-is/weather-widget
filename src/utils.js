export class LocalStore {
  constructor (key) {
    this.key = key
  }

  set item (args) {
    localStorage.setItem(this.key, JSON.stringify(args))
  }

  get item () {
    return JSON.parse(localStorage.getItem(this.key))
  }
}
