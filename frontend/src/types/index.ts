export interface University {
  id?: number;
  name: string;
  location: string;
  description?: string;
  foundedYear?: number;
}

export interface ResearchPaper {
  id?: number;
  title: string;
  abstractText?: string;
  authors: string;
  publicationYear?: number;
  journal?: string;
  university?: University;
}

export interface Collaboration {
  id?: number;
  title: string;
  description?: string;
  universityOne: University;
  universityTwo: University;
  startDate?: string;
  endDate?: string;
  status?: string;
}
