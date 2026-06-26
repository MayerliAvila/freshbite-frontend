import { Routes } from '@angular/router';
import { InicioSesion } from './pages/inicio-sesion/inicio-sesion';
import { RegistroUsuario } from './pages/registro-usuario/registro-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { EditorPerfil } from './pages/editor-perfil/editor-perfil';
import { AgregarProducto } from './pages/agregar-producto/agregar-producto';
import { RetirarProducto } from './pages/retirar-producto/retirar-producto';
import { Despensa } from './pages/despensa/despensa';
import { Recetas } from './pages/recetas/recetas';

export const routes: Routes = [
    {
        path:'',
        component:InicioSesion
    },
    {
        path:'registro',
        component:RegistroUsuario
    },
    {
        path:'dashboard',
        component:Dashboard
    },
    {
        path:'perfil',
        component:EditorPerfil
    },
    {
        path:'agregar',
        component:AgregarProducto
    },
    {
        path:'retirar',
        component:RetirarProducto
    },
    {
        path:'despensa',
        component:Despensa
    }, 
    {
        path:'recetas',
        component:Recetas
    }

];
