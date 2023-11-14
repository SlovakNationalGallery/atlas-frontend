import type { Meta, StoryObj } from '@storybook/vue3'

import { authorityMock } from '^/mocks'
import Collapsible from '@/components/general/Collapsible.vue'
import AuthoritySummary from '@/components/author/AuthoritySummary.vue'
import AuthorityDetails from '@/components/author/AuthorityDetails.vue'
import VideoSummary from '@/components/general/VideoSummary.vue'
import ResponsiveVideoEmbed from '@/components/general/ResponsiveVideoEmbed.vue'
import AuthorityModel from '@/models/Authority'
import ItemModel from '@/models/Item'

const meta = {
  title: 'General/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
  ],
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Authority: Story = {
  render: (args) => ({
    components: { Collapsible, AuthoritySummary, AuthorityDetails },
    setup() {
      const model = ref(false)
      const updateModel = (value: boolean) => (model.value = value)
      const authority = new AuthorityModel(authorityMock)

      return { args, model, updateModel, authority }
    },
    template:
      '<div class="flex gap-3">' +
      '   <Collapsible class="w-full" v-bind="args" :modelValue="model" @update:modelValue="updateModel">' +
      '      <template #summary>' +
      '         <AuthoritySummary class="cursor-pointer" :authority="authority" />' +
      '      </template>' +
      '      <AuthorityDetails :authority="authority" />' +
      '   </Collapsible>' +
      '</div>',
  }),
}

export const Video: Story = {
  render: (args) => ({
    components: { Collapsible, VideoSummary, ResponsiveVideoEmbed },
    async setup() {
      const model = ref(false)
      const updateModel = (value: boolean) => (model.value = value)
      const item = await ItemModel.load('SVK:SNG.O_7025')

      return { args, model, updateModel, item }
    },
    template:
      '<div class="flex gap-3">' +
      '   <Collapsible class="w-full" v-bind="args" :modelValue="model" @update:modelValue="updateModel">' +
      '      <template #summary>' +
      '          <VideoSummary' +
      '            :thumbnail="item.video_thumbnail"' +
      '            :title="item.video_title"' +
      '            :subtitle="item.video_subtitle"' +
      '          />' +
      '        </template>' +
      '        <ResponsiveVideoEmbed' +
      '            :src="item.video_embed"' +
      '            :width="item.video_aspect_ratio?.width"' +
      '            :height="item.video_aspect_ratio?.height"' +
      '        />' +
      '   </Collapsible>' +
      '</div>',
  }),
}

// TODO: related items
