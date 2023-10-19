import { Outlet } from 'react-router-dom'; // Posiciona o conteúdo específico de uma página
import { Header } from '../../components/Header';
import { LayoutContainer } from './styles';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
