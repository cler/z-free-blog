import React from 'react';
import { PersonalInfo } from '@/lib/types/personal-info';

interface PersonalInfoComponentProps {
  data: PersonalInfo;
  className?: string;
}

export default function PersonalInfoComponent({ data, className = '' }: PersonalInfoComponentProps) {
  return (
    <div className={`person-info ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-white">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {data.frontendStack.title}
            </h2>
            <ul className="space-y-2 text-white">
              {data.frontendStack.skills.map((skill, index) => (
                <li key={index}>• {skill.name} - {skill.description}</li>
              ))}
            </ul>
          </div>

          <div className="bg-black/20  border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {data.backendStack.title}
            </h2>
            <ul className="space-y-2 text-white/95">
              {data.backendStack.skills.map((skill, index) => (
                <li key={index}>• {skill.name} - {skill.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {data.specialties.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {data.specialties.items.map((specialty, index) => (
              <div key={index}>
                <div className="text-3xl mb-2">{specialty.emoji}</div>
                <h3 className="font-semibold text-white mb-2">{specialty.title}</h3>
                <p className="text-sm text-white/90">
                  {specialty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}