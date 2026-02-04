import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-black/80 text-white shadow-lg">
      <nav className="w-full flex justify-center items-center">
        <ul className="flex gap-4 py-4 text-sm">
          <li>
            <Link
              to="/pessoa"
              className="hover:text-gray-400 transition-colors font-medium"
            >
              Pessoas
            </Link>
          </li>
          <li>
            <Link
              to="/categoria"
              className="hover:text-gray-400 transition-colors font-medium"
            >
              Categorias
            </Link>
          </li>
          <li>
            <Link
              to="/transacao"
              className="hover:text-gray-400 transition-colors font-medium"
            >
              Transações
            </Link>
          </li>
          <li>
            <Link
              to="/total"
              className="hover:text-gray-400 transition-colors font-medium"
            >
              Consulta de Totais
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
