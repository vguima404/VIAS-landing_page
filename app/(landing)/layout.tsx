import { Navbar } from "@/components/navbar/navbar";
import { PhoneCanvasMount } from "@/components/phone";

/**
 * Layout da landing page: navbar fixa e o canvas compartilhado do iPhone 3D.
 * O Painel do gestor (/painel) tem o próprio layout, sem esses dois.
 */
export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
      <PhoneCanvasMount />
    </>
  );
}
