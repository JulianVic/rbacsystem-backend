export type ExperienceLevel = 'junior' | 'intermediate' | 'senior';

export interface Role {
  role: string;
  experienceLevel: ExperienceLevel;
}