import 'styled-components'; // Se não tivesse importado, estaria criando do zero e não extendendo a definição de tipos
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
