import ids from 'virtual:svg-icons-names'

import type { Meta, StoryObj } from '@storybook/vue3'

import Icon from '@/components/general/Icon.vue'
import { iconControl } from '^/controls'

const meta = {
  title: 'General/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: iconControl(true),
  },
  args: {
    name: 'chat',
  },
  decorators: [
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
  ],
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Icon },
    async setup() {
      return { args, ids: ids.map((i) => i.replace('icon-', '')) }
    },
    template:
      '<div class="flex flex-wrap gap-3"><Icon :name="args.name" /><Icon v-for="name in ids" :name="name" /></div>',
  }),
}
