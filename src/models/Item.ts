import axios from 'axios'

import type { IImage } from '@/models/_Interfaces'

import BaseModel from '@/models/_BaseModel'
import Bucketlist from '@/models/Bucketlist'
import Authority from '@/models/Authority'

export default class Item extends BaseModel {
  public static mapping = {
    authorities: () => Authority,
  }

  public declare id: string
  public declare title: string
  public declare author: string
  public declare author_description: string
  public declare dating: number
  public declare locked_bucketlist_description: string
  public declare dating_short: number
  public declare description: string
  public declare authorities: Authority[]

  public declare image_src: string
  public declare image_srcset: string
  public declare images: IImage[]
  public declare image_aspect_ratio: number
  public declare webumenia_url: string
  public declare code: string
  public declare offset_top: number
  public declare video_thumbnail: IImage | null
  public declare video_embed: string
  public declare video_aspect_ratio: {
    width: number
    height: number
  } | null
  public declare video_title: string
  public declare video_subtitle: string
  public declare story_id: string | null
  public declare location_formatted: string
  public declare exhibition: {
    id: string
    name: string
  }

  public declare bucketlists: Bucketlist[]

  constructor(o: any) {
    super(o)
  }

  static load = async (id: string) => {
    const response = await axios.get(`/api/items/${id}`)
    const model = new this(response.data.data)

    if (model.authorities.length) {
      model.authorities[0].isOpened = true
    }

    return model
  }
}
