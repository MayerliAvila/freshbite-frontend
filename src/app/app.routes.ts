import { Routes } from '@angular/router';

import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { EditorPerfil } from './pages/editor-perfil/editor-perfil';
import { AgregarProducto } from './pages/agregar-producto/agregar-producto';
import { RetirarProducto } from './pages/retirar-producto/retirar-producto';
import { Despensa } from './pages/despensa/despensa';
import { Recetas } from './pages/recetas/recetas';

/**
 * Configuración de las rutas principales de la aplicación.
 * Cada ruta permite acceder a un componente específico.
 */
export const routes: Routes = [

  /**
   * Ruta de inicio.
   * Muestra la pantalla de inicio de sesión.
   */
  {
    path: '',
    component: InicioSesion
  },

  /**
   * Ruta para registrar un nuevo usuario.
   */
  {
    path: 'registro',
    component: RegistroUsuario
  },

  /**
   * Ruta del Dashboard principal.
   */
  {
    path: 'dashboard',
    component: Dashboard
  },

  /**
   * Ruta para editar la información del perfil.
   */
  {
    path: 'perfil',
    component: EditorPerfil
  },

  /**
   * Ruta para agregar productos al inventario.
   */
  {
    path: 'agregar',
    component: AgregarProducto
  },

  /**
   * Ruta para retirar productos del inventario.
   */
  {
    path: 'retirar',
    component: RetirarProducto
  },

  /**
   * Ruta para visualizar la despensa del usuario.
   */
  {
    path: 'despensa',
    component: Despensa
  },

  /**
   * Ruta para visualizar las recetas sugeridas por la IA.
   */
  {
    path: 'recetas',
    component: Recetas
  }

];