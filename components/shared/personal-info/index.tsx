import React from 'react';
import { PersonalInfo } from '@/lib/types/personal-info';

interface PersonalInfoComponentProps {
  data: PersonalInfo;
  className?: string;
}

export default function PersonalInfoComponent({ data, className = '' }: PersonalInfoComponentProps) {
  return (
    <div className={`person-info ${className}`}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {data.title}
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {data.frontendStack.title}
            </h2>
            <ul className="space-y-2 text-gray-600">
              {data.frontendStack.skills.map((skill, index) => (
                <li key={index}>• {skill.name} - {skill.description}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {data.backendStack.title}
            </h2>
            <ul className="space-y-2 text-gray-600">
              {data.backendStack.skills.map((skill, index) => (
                <li key={index}>• {skill.name} - {skill.description}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 bg-opacity-20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {data.specialties.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.specialties.items.map((specialty, index) => (
              <div key={index}>
                <div className="text-3xl mb-2">{specialty.icon}</div>
                <h3 className="font-semibold text-gray-700 mb-2">{specialty.title}</h3>
                <p className="text-sm text-gray-600">
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