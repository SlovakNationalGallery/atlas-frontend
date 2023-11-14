import type { Meta, StoryObj } from '@storybook/vue3'

import LanguageSwitcher from '@/components/layout/LanguageSwitcher.vue'

const meta = {
  title: 'Layout/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LanguageSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
