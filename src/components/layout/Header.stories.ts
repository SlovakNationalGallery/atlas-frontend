import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import Header from '@/components/layout/Header.vue'

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [vueRouter()],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
