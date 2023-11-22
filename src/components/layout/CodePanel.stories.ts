import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import CodePanel from '@/components/layout/CodePanel.vue'
import FAB from '@/components/layout/FAB.vue'

const meta = {
  title: 'Layout/CodePanel',
  component: CodePanel,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [
    vueRouter(),
    () => ({
      template: '<div class="min-h-[700px] border-1 "><story /></div>',
    }),
  ],
} satisfies Meta<typeof CodePanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { CodePanel, FAB },
    setup() {
      return { args }
    },
    template: '<CodePanel /> <FAB class="fixed bottom-10 right-10" />',
  }),
}
