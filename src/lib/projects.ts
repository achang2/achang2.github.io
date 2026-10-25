import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectStatus = Project['data']['status'];

export const statusLabels: Record<ProjectStatus, string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  paused: 'Paused',
  complete: 'Complete',
};

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}
