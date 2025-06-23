import MenuDetailsSection from "@/modules/menus/menudetailsSection";

interface PageProps {
  params: { id: string };
}

export default function MenuDetailsPage({ params }: PageProps) {
  return <MenuDetailsSection params={params} />;
}
