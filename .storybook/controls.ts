import ids from 'virtual:svg-icons-names'

export const iconControl = (mandatory = false) => ({
  control: 'select',
  options: !mandatory
      ? [undefined, ...ids.map((id: string) => id.replace('icon-', ''))]
      : ids.map((id: string) => id.replace('icon-', '')),
})
