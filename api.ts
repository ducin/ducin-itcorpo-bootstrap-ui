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

export type GenerateReportCommand = {
  id: string
  extention: "pdf"
  type: "project"
  scheduledAt: string
}
// command - do wykonania
// event - już zostało wykonane

export type Report = {
  id: string
  ready: boolean
  scheduledAt: string
  filename: string
  generatedAt: string
  }

export const generateReport = async (payload: GenerateReportCommand) => {
  const response = await axios.post
    (`${API_URL}/reports`, payload)
  return response.data
}

export const createGenerateReportCommand = (id: string): GenerateReportCommand => ({
  id,
  extention: "pdf",
  type: "project",
  scheduledAt: (new Date()).toISOString()
})

export const getReport = async (id: string) => {
  const response = await axios.get<Report>
    (`${API_URL}/reports/${id}`)
  return response.data
}

export const getReportFileURL = (id: string) =>
  `${API_URL}/reports/${id}/file`
