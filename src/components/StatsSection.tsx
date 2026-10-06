'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, Clock, GraduationCap } from 'lucide-react';
import { instituteInfo } from '@/lib/data/institute';

const statConfig = [
  { key: 'studentsPlaced' as const, icon: Users, label: 'Students Placed', color: 'text-primary' },
  { key: 'coursesOffered' as const, icon: BookOpen, label: 'Tech Courses', color: 'text-secondary' },
  { key: 'placementRate' as const, icon: Trophy, label: 'Placement Assistance', color: 'text-secondary' },
  { key: 'yearsExperience' as const, icon: Clock, label: 'Years Experience', color: 'text-accent' },
  { key: 'batchesCompleted' as const, icon: GraduationCap, label: 'Batches Done', color: 'text-primary' },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 border-y border-border bg-background-alt">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {statConfig.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="premium-card text-center group px-4 py-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:from-primary/15 group-hover:to-secondary/15 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 tracking-tight">
                {instituteInfo.stats[stat.key]}
              </div>
              <div className="text-xs sm:text-sm text-muted font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
