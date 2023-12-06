import BaseModel from '@/models/_BaseModel'

export default class Interaction extends BaseModel {
  public declare id: string
  public linkId: string | null
  constructor(o: any) {
    super(o)

    this.linkId = ''
  }
}
