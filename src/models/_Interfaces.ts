export interface IImage {
  srcset: string
  src: string
  width?: number
  height?: number
  deep_zoom_url?: string
}

export interface ILink {
  id: string
  title: string
  story_id: string
}
