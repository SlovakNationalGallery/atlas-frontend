import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import Banner from '@/components/bucketlist/Banner.vue'
import ItemModel from '@/models/Item'

const meta = {
  title: 'Bucketlist/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    item: null as any,
  },
  argTypes: {},
  decorators: [
    vueRouter(),
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
  ],
  render: (args) => ({
    components: { Banner },
    async setup() {
      const item = await ItemModel.load('SVK:SNG.UP-F_1202')
      return { args, item }
    },
    template: '<Banner :item="item" />',
  }),
} satisfies Meta<typeof Banner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
