import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';



import DashboardPage from '../pages/pages-dashboard/DashboardPage'; 
import LocalesPage from '../pages/pages-dashboard/LocalesPage'; 
import PerfilPage from '../pages/pages-dashboard/PerfilPage'; 
import ProductosPage from '../pages/pages-dashboard/ProductosPage'; 
import UsuariosPage from '../pages/pages-dashboard/UsuariosPage'; 
import VentasPage from '../pages/pages-dashboard/VentasPage'; 

import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Principal',
  },
  {
    segment: 'vistaGeneral',
    title: 'Vista General',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Otras Vistas',
  },
  {
    segment: 'crud',
    title: 'CRUD',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'usuarios',
        title: 'Clientes',
        icon: <PersonIcon />,
      },
      {
        segment: 'productos',
        title: 'Productos',
        icon: <LocalOfferIcon />,
      },
      {
        segment: 'ventas',
        title: 'Ventas',
        icon: <ProductionQuantityLimitsIcon />,
      },
      {
        segment: 'locales',
        title: 'Locales',
        icon: <StoreIcon />,
      },
    ],
  },
  {
    segment: 'perfil',
    title: 'Perfil',
    icon: <AccountCircleIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),  // Función para actualizar el pathname
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const DynamicView = ({ pathname }) => {
  switch (pathname) {
    case '/vistaGeneral':
      return <DashboardPage />;
    case '/crud':
      return <UsuariosPage />;
    case '/crud/usuarios':
      return <UsuariosPage />;
    case '/crud/productos':
      return <ProductosPage />;
    case '/crud/ventas':
      return <VentasPage />;
    case '/crud/locales':
      return <LocalesPage />;
    case '/perfil':
      return <PerfilPage />;
    default:
      return <h2>Selecciona una sección en la barra de navegación</h2>;
  }
};

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {/* Asegúrate de que este componente se está renderizando correctamente */}
          <DynamicView pathname={router.pathname} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
