import axios from 'axios'

import type { IImage } from '@/models/_Interfaces'

import BaseModel from '@/models/_BaseModel'
import Item from '@/models/Item'

export default class Section extends BaseModel {
  public static mapping = {
    items: () => Item,
  }

  public declare id: string
  public declare code: string
  public declare description: string
  public declare location_formatted: string
  public declare title: string
  public declare image: IImage
  public declare items: Item[]

  static load = async (id: string) => {
    const response = await axios.get(`/api/sections/${id}`)
    return new this(response.data.data)
  }
}
