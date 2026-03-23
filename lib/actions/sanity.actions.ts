'use server'

import { client } from "@/client";
import { ExperienceDoc } from "@/Container/Skills/_components/ExperienceItem";

export const getAllSkills = async () : Promise<skills[]> => {
  const query = `*[_type == "skills"]`;
  const data = await client.fetch(query);
  return data;
}

export const getAllExperiences = async () : Promise<ExperienceDoc[]> => {
  //const query = `*[_type == "experiences"]`;
  const query = `*[_type == "experiences" && !(_originalId in path("drafts.**"))] | order(startDate asc) {
  ...,
  company-> {
    name,
    logo { asset-> { url } }
  }
}`;
  const data = await client.fetch(query);
  return data;
}