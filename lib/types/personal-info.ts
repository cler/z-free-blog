export interface Skill {
  name: string;
  description: string;
}

export interface TechStack {
  title: string;
  skills: Skill[];
}

export interface Specialty {
  emoji: string;
  title: string;
  description: string;
}

export interface PersonalInfo {
  title: string;
  subtitle: string;
  frontendStack: TechStack;
  backendStack: TechStack;
  specialties: {
    title: string;
    items: Specialty[];
  };
}