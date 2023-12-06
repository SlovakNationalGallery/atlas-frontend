import type { Meta, StoryObj } from '@storybook/vue3'

import CopyLink from '@/components/general/CopyLink.vue'

const meta = {
  title: 'General/CopyLink',
  component: CopyLink,
  tags: ['autodocs'],
  argTypes: {
    link: { control: 'text' },
  },
  args: {
    link: 'https://www.google.com',
  },
} satisfies Meta<typeof CopyLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
