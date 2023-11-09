import BaseModel from '@/models/_BaseModel'

export default class Authority extends BaseModel {
  public declare id: string
  public declare name: string
  public declare has_image: boolean
  public declare biography: string
  public declare birth_place: string
  public declare death_place: string
  public declare birth_date: string
  public declare death_date: string
  public declare image_url: string
  public declare related_items: string[]

  public isOpened: boolean

  constructor(o: any) {
    super(o)

    this.isOpened = false
  }
}
