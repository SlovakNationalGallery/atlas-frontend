import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import ItemDetail from '@/pages/item/[id].vue'

const customRoutes = [
  {
    path: '/detail/:id',
    component: ItemDetail,
    props: true,
  },
]

const meta = {
  title: 'Pages/ItemDetail',
  component: ItemDetail,
  tags: ['autodocs'],

  decorators: [
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
    vueRouter(customRoutes, {
      initialRoute: 'detail/SVK:SNG.O_6208',
    }),
  ],
} satisfies Meta<typeof ItemDetail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
