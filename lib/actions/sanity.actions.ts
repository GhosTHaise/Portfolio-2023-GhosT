'use server'

import { client } from "@/client";

export const getAllSkills = async () : Promise<skills[]> => {
  const query = `*[_type == "skills"]`;
  const data = await client.fetch(query);
  return data;
}

export const getAllExperiences = async () : Promise<experience[]> => {
  const query = `*[_type == "experiences"]`;
  const data = await client.fetch(query);
  return data;
}