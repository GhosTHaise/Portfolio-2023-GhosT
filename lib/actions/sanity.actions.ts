'use server'

import { client } from "@/client";
import { ExperienceDoc } from "@/Container/Skills/_components/ExperienceItem";

export const getAllSkills = async (): Promise<skills[]> => {
  try {
    const query = `*[_type == "skills"]`;
    const data = await client.fetch(query);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export const getAllExperiences = async (): Promise<ExperienceDoc[]> => {
  try {
    const query = `*[_type == "experiences" && !(_originalId in path("drafts.**"))] | order(startDate asc) {
  ...,
  company-> {
    name,
    logo { asset-> { url } }
  }
}`;
    const data = await client.fetch(query);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
