import type { Meta, StoryObj } from '@storybook/vue3'

import { authorityMock } from '^/mocks'
import AboutCollapsible from '@/components/about/AboutCollapsible.vue'
import AuthoritySummary from '@/components/author/AuthoritySummary.vue'
import AuthorityDetails from '@/components/author/AuthorityDetails.vue'
import AuthorityModel from '@/models/Authority'

const meta = {
  title: 'About/AboutCollapsible',
  component: AboutCollapsible,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<Suspense><story /></Suspense>',
    }),
  ],
} satisfies Meta<typeof AboutCollapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Authority: Story = {
  render: (args) => ({
    components: { AboutCollapsible, AuthoritySummary, AuthorityDetails },
    setup() {
      const model = ref(false)
      const updateModel = (value: boolean) => (model.value = value)
      const authority = new AuthorityModel(authorityMock)

      return { args, model, updateModel, authority }
    },
    template:
      '<div class="flex gap-3">' +
      '   <AboutCollapsible class="w-full" v-bind="args" :modelValue="model" @update:modelValue="updateModel">' +
      '      <template #summary>Ako používať Atlas?</template>' +
      '       Atlas ti umožní zbierať diela ktoré sa Ti páčia a vrátiť sa ' +
      'k nim neskôr, spolu s rozšírenými informáciami priamo z Archívu. ' +
      'Interaktívne sprievody – Trasy – ťa prevedú SNG presne podľa toho, ' +
      'čo Ťa zaujíma a tempom aké si určíš.' +
      '   </AboutCollapsible>' +
      '</div>',
  }),
}
