import { vueRouter } from 'storybook-vue3-router'

import type { Meta, StoryObj } from '@storybook/vue3'

import CTABanner from '@/components/general/CTABanner.vue'
import { iconControl } from '^/controls'

const meta = {
  title: 'General/CTABanner',
  component: CTABanner,
  tags: ['autodocs'],
  argTypes: {
    link: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    icon: iconControl(true),
    buttonIcon: iconControl(true),
  },
  args: {
    icon: 'plus',
    link: 'https://www.google.com',
    title: 'Vytvor si vlastnú kolekciu!',
    description: 'Navštív nás v Bratislave a spoznávaj umenie cez Atlas SNG.',
    buttonLabel: 'Viac informácií',
  },
  decorators: [vueRouter()],
} satisfies Meta<typeof CTABanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
