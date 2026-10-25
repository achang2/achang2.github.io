import { getCollection, type CollectionEntry } from 'astro:content';

export type Update = CollectionEntry<'updates'>;

/** All weekly updates, newest first. */
export async function getUpdates(): Promise<Update[]> {
  const updates = await getCollection('updates');
  return updates.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Every tag in use, with how many posts have it, sorted alphabetically. */
export function getTagCounts(updates: Update[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const update of updates) {
    for (const tag of new Set(update.data.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** Machine-readable value for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Plain text of a post for the client-side search: title, summary, tags and the
 * Markdown body with its syntax stripped, lowercased and whitespace-collapsed.
 */
export function searchText(update: Update): string {
  const body = (update.body ?? '')
    .replace(/<!--[\s\S]*?-->/g, ' ') // HTML comments
    .replace(/<[^>]+>/g, ' ') // HTML tags
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '') // headings, quotes, list markers
    .replace(/[*_~`]+/g, ''); // emphasis and code markers
  return [update.data.title, update.data.summary, update.data.tags.join(' '), body]
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
