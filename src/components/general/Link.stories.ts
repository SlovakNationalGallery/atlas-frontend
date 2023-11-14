import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import { iconControl } from '^/controls'
import Link from '@/components/general/Link.vue'

const meta = {
  title: 'General/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    link: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    external: { control: 'boolean' },
    icon: iconControl(true),
  },
  args: {
    link: 'https://www.google.com',
    title: 'Google',
    description: 'Link to Google',
    icon: 'chat',
    external: true,
  },
  decorators: [vueRouter()],
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
