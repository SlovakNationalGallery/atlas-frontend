export interface IImage {
  srcset: string
  src: string
  width?: number
  height?: number
  deep_zoom_url?: string
  aspect_ratio?: number
}

export interface ILink {
  id: string
  title: string
  story_id: string
}
