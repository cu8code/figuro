import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from "path";

export async function getLastModified(filePath: string): Promise<Date> {
	try {
		const stats = await fs.stat(filePath);
		return stats.mtime;
	} catch (error) {
		console.error(`Error reading file stats for ${filePath}:`, error);
		return new Date();
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://removebackground.figuro.in';

	const filePaths = {
		home: path.join(process.cwd(), 'app', 'page.tsx'),
		howItWorks: path.join(process.cwd(), 'app', 'how-it-works', 'page.tsx'),
	};

	const lastModifiedHome = await getLastModified(filePaths.home);
	const lastModifiedHowItWorks = await getLastModified(filePaths.howItWorks);

	return [
		{
			url: `${baseUrl}`,
			lastModified: lastModifiedHome,
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${baseUrl}/how-it-works`,
			lastModified: lastModifiedHowItWorks,
			changeFrequency: 'yearly',
			priority: 0.8,
		},
	];
}
