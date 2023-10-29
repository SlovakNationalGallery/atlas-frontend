import BaseModel from '@/models/_BaseModel'

export default class Interaction extends BaseModel {
  public declare id: string
  public declare name: string
  public declare author: string
  public declare title: string
  public declare type: 'story' | 'itemFavourited' | 'itemViewed' | 'sectionViewed' | 'placeViewed'
  public declare size: number

  public linkId: string | null
  constructor(o: any) {
    super(o)

    this.linkId = ''
  }
}
