'use client'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import type { SkillRatings } from '@/types'

export default function SkillRadar({ ratings }: { ratings: SkillRatings }) {
  const data = [
    { skill: 'Serve', value: ratings.serve },
    { skill: 'Pass', value: ratings.pass },
    { skill: 'Set', value: ratings.set },
    { skill: 'Attack', value: ratings.attack },
    { skill: 'Block', value: ratings.block },
    { skill: 'Defense', value: ratings.defense },
    { skill: 'Fitness', value: ratings.fitness },
  ]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="#2d3f55" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ab', fontSize: 12 }} />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#F5A623"
          fill="#F5A623"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
