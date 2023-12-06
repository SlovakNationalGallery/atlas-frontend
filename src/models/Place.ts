import axios from 'axios'

import type { IImage } from '@/models/_Interfaces'

import BaseModel from '@/models/_BaseModel'

export default class Place extends BaseModel {
  public declare id: string
  public declare code: string
  public declare title: string
  public declare description: string
  public declare image: IImage

  public declare offset_top: number

  public declare video_embed: string | null
  public declare video_aspect_ratio: {
    width: number
    height: number
  } | null
  public declare video_thumbnail: IImage | null
  public declare video_duration: number | null
  public declare video_title: string
  public declare video_subtitle: string
  public declare story_id: string | null
  public declare location_formatted: string

  public get image_src() {
    return this.image.src
  }

  public get image_srcset() {
    return this.image.srcset
  }

  public get image_aspect_ratio() {
    return this.image.aspect_ratio
  }

  public get image_alt() {
    return this.title
  }

  public get link() {
    return `/place/${this.id}`
  }

  static load = async (id: string) => {
    const response = await axios.get(`/api/places/${id}`)
    return new this(response.data.data)
  }
}
