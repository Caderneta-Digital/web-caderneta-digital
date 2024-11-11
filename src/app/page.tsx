import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Link href="/login?flow=interns" className="mb-4">Entre aqui para Logar como estagiario!</Link>
      <Link href="/login" className="mb-4">Entre aqui para Logar como tutor!</Link>
      <Link href="/login" className="mb-4">Entre aqui para Logar como entidade de acolhimento!</Link>
      <Link href="/login?flow=supervisors" className="mb-4">Entre aqui para Logar como orientador!</Link>
      <Link href="/dashboard" className="mb-4">Entre aqui para DashBoard!</Link>
      <Link href="/regis/intern">Entre aqui para concluir perfil de Estagiario!</Link>
      <Link href="/regis/internAdvisor">Entre aqui para concluir perfil de Tutor!</Link>
      <Link href="/regis/supervisor">Entre aqui para concluir perfil de Orientador!</Link>
      <Link href="/regis/entity">Entre aqui para concluir perfil de Entidade de acolhimento!</Link>
    </div>
  );
}

