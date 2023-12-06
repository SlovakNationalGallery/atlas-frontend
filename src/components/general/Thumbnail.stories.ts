import type { Meta, StoryObj } from '@storybook/vue3'

import Thumbnail from '@/components/general/Thumbnail.vue'
import ResponsiveImageWithSizes from '@/components/general/ResponsiveImageWithSizes.vue'
import Item from '@/models/Item'

const meta = {
  title: 'General/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  args: {
    icon: 'chevron-right',
  },
  decorators: [
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
  ],
} satisfies Meta<typeof Thumbnail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Thumbnail, ResponsiveImageWithSizes },
    async setup() {
      const item = await Item.load('SVK:SNG.UP-F_1202')

      return { args, item }
    },
    template:
      '  <Thumbnail v-bind="args">' +
      '    <template #image>' +
      '      <ResponsiveImageWithSizes' +
      '        class="h-full w-full rounded-xl object-cover"' +
      '        :image="{ src: item.image_src, srcset: item.image_srcset }"' +
      '      />' +
      '    </template>' +
      '    <template #title>{{ item.title }}</template>' +
      '    <template #description>{{ item.author }}<br />{{ item.dating }}</template>' +
      '  </Thumbnail>',
  }),
}

export const WithBorder: Story = {
  args: {
    border: true,
  },
  render: (args) => ({
    components: { Thumbnail, ResponsiveImageWithSizes },
    async setup() {
      const item = await Item.load('SVK:SNG.UP-F_1202')

      return { args, item }
    },
    template:
      '  <Thumbnail v-bind="args">' +
      '    <template #image>' +
      '      <ResponsiveImageWithSizes' +
      '        class="h-full w-full rounded-xl object-cover"' +
      '        :image="{ src: item.image_src, srcset: item.image_srcset }"' +
      '      />' +
      '    </template>' +
      '    <template #title>{{ item.title }}</template>' +
      '    <template #description>{{ item.author }}<br />{{ item.dating }}</template>' +
      '  </Thumbnail>',
  }),
}

export const WithBgColor: Story = {
  args: {
    bgColor: 'E8E8E8',
  },
  render: (args) => ({
    components: { Thumbnail, ResponsiveImageWithSizes },
    async setup() {
      const item = await Item.load('SVK:SNG.UP-F_1202')

      return { args, item }
    },
    template:
      '  <Thumbnail v-bind="args">' +
      '    <template #image>' +
      '      <ResponsiveImageWithSizes' +
      '        class="h-full w-full rounded-xl object-cover"' +
      '        :image="{ src: item.image_src, srcset: item.image_srcset }"' +
      '      />' +
      '    </template>' +
      '    <template #title>{{ item.title }}</template>' +
      '    <template #description>{{ item.author }}<br />{{ item.dating }}</template>' +
      '  </Thumbnail>',
  }),
}
