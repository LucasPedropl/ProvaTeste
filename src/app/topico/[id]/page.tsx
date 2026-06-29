import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModuleById, studyModules } from "../../../features/study/services/contentData";
import TopicReader from "../../../features/study/components/TopicReader";

export function generateStaticParams() {
  return studyModules.map((studyModule) => ({ id: studyModule.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const studyModule = getModuleById(id);
  if (!studyModule) return { title: "Tópico não encontrado" };
  return {
    title: `${studyModule.title} | Teste de Software`,
    description: studyModule.description,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studyModule = getModuleById(id);

  if (!studyModule) {
    notFound();
  }

  return <TopicReader studyModule={studyModule} />;
}
