import axios from 'axios'

import type { IImage } from '@/models/_Interfaces'

import BaseModel from '@/models/_BaseModel'
import Item from '@/models/Item'

export default class Bucketlist extends BaseModel {
  public static mapping = {
    items: () => Item,
  }

  public declare id: string
  public declare title: string
  public declare text: string
  public declare image: IImage
  public declare items: Item[]

  public get image_src() {
    return this.image.src
  }

  public get image_srcset() {
    return this.image.srcset
  }

  public get image_aspect_ratio() {
    return this.image.aspect_ratio
  }

  public get offset_top() {
    return 0
  }

  public get offset_top_percent() {
    return 0
  }

  public get image_alt() {
    return this.title
  }

  public get code() {
    return ''
  }

  public get link() {
    return `/bucketlist/${this.id}`
  }
  static load = async (id: string) => {
    const response = await axios.get(`/api/bucketlists/${id}`)
    return new this(response.data.data)
  }
}
