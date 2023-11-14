import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import FAB from '@/components/layout/FAB.vue'

const meta = {
  title: 'Layout/FAB',
  component: FAB,
  tags: ['autodocs'],
  argTypes: {
    opened: { control: 'boolean' },
  },
  args: {
    opened: true,
  },
  decorators: [vueRouter()],
} satisfies Meta<typeof FAB>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
