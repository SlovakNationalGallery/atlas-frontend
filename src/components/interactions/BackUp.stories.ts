import type { Meta, StoryObj } from '@storybook/vue3'

import BackUp from '@/components/interactions/BackUp.vue'

const meta = {
  title: 'Interactions/BackUp',
  component: BackUp,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof BackUp>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
