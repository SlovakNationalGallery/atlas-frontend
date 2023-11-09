import axios from 'axios'

import type { IImage, ILink } from '@/models/_Interfaces'

import BaseModel from '@/models/_BaseModel'

export default class Story extends BaseModel {
  public declare id: string
  public declare name: string
  public declare text: string

  public declare video_embed: string
  public declare video_aspect_ratio: {
    width: number
    height: number
  } | null
  public declare video_duration: string
  public declare video_thumbnail: IImage | null

  public declare images: IImage[]
  public declare links: ILink[]

  static load = async (id: string) => {
    const response = await axios.get(`/api/stories/${id}`)
    return new this(response.data.data)
  }
}
