import axios from 'axios'

const API_URL = 'http://localhost:3010'

export type Project = {
  "id": string;
  "name": string;
  "budget": number;
  "startDate": string;
  "endDate": string;
  "team": {
    "id": number;
    "name": string;
  }[];
  "manager": number;
  "description": string;
};

export const getProjects = async () => {
  const response = await axios.get<Project[]>
    (`${API_URL}/projects/`)
  return response.data
}
