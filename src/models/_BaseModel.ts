export type Data = Record<string, any>

export default class BaseModel<T = Data> {
  public static mapping: { [key: string]: any } = {}

  constructor(data: T) {
    this.update(data)
  }

  public update(data: T) {
    const Constructor = <typeof BaseModel>this.constructor

    for (const name in data) {
      const Mapping = Constructor.mapping[name] ? Constructor.mapping[name]() : null
      let value = data[name]

      if (Mapping && value) {
        value = Array.isArray(value) ? value.map((item) => new Mapping(item)) : new Mapping(value)
      }

      const obj = this as any
      obj[name] = value
    }
  }

  public toJSON() {
    return Object.assign({}, this)
  }

  public clone(): this {
    const Constructor = <typeof BaseModel>this.constructor
    return new Constructor(this.toJSON()) as any
  }
}
