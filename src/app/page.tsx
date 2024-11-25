import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Link href="/login/intern" className="mb-4">
        Entre aqui para Logar como estagiario!
      </Link>
      <Link href="/login/supervisor" className="mb-4">
        Entre aqui para Logar como orientador!
      </Link>
      <Link href="/login/internAdvisor" className="mb-4">
        Entre aqui para Logar como tutor!
      </Link>
    </div>
  );
}
