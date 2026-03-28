'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, Clock, Building2, GraduationCap } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

const statConfig = [
  { key: 'studentsPlaced' as const, icon: Users, label: 'Students Placed', color: 'text-blue-400' },
  { key: 'coursesOffered' as const, icon: BookOpen, label: 'Tech Courses', color: 'text-purple-400' },
  { key: 'placementRate' as const, icon: Trophy, label: 'Placement Assistance', color: 'text-green-400' },
  { key: 'yearsExperience' as const, icon: Clock, label: 'Years Experience', color: 'text-cyan-400' },
  { key: 'hiringPartners' as const, icon: Building2, label: 'Hiring Partners', color: 'text-amber-400' },
  { key: 'batchesCompleted' as const, icon: GraduationCap, label: 'Batches Done', color: 'text-pink-400' },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 border-y border-border/30 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statConfig.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {instituteInfo.stats[stat.key]}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
