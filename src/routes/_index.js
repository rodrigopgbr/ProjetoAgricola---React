import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWrapper from './routeWrapper';

// templates
import TemplateDashboard from '../templates/dashboard/_index';
import TemplateCommun from '../templates/commun/_index';

//  ----- pages -----
import NotFound from '../pages/notFound/_index';
import Login from '../pages/login/_index';
import Home from '../pages/dashboard/home/_index';

// security
import Users from '../pages/dashboard/security/users/_index';
import Profile from '../pages/dashboard/security/profile/_index';
import Permissions from '../pages/dashboard/security/permissions/_index';
import ClonePermission from '../pages/dashboard/security/clonePermissions/_index';
import Company from '../pages/dashboard/security/company/_index';
import Password from '../pages/dashboard/security/password/_index';
import Farm from '../pages/dashboard/security/farm/_index';

// RH
import Employees from '../pages/dashboard/rh/employees/_index';
import Overtime from '../pages/dashboard/rh/overtime/_index';
import ScheduleHolidays from '../pages/dashboard/rh/scheduleHolidays/_index';
import LaunchProduction from '../pages/dashboard/rh/launchProduction/_index';
import Team from '../pages/dashboard/rh/team/_index';
import PositionsFunctions from '../pages/dashboard/rh/positionsFunctions/_index';

export default function Router() {
  return (
    <Switch>
      <RouteWrapper
        path="/"
        exact
        component={Login}
        template={TemplateCommun}
      />
      <RouteWrapper
        path="/dashboard"
        exact
        component={Home}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/home"
        exact
        component={Home}
        template={TemplateDashboard}
        isPrivate
      />

      {/* --- Seguraça --- */}
      <RouteWrapper
        path="/dashboard/seguranca/usuarios"
        exact
        component={Users}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/seguranca/permissoes"
        exact
        component={Permissions}
        template={TemplateDashboard}
        isPrivate
      />

      <RouteWrapper
        path="/dashboard/seguranca/perfis"
        exact
        component={Profile}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/seguranca/clonar-permissoes"
        exact
        component={ClonePermission}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/seguranca/empresa"
        exact
        component={Company}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/seguranca/senhas"
        exact
        component={Password}
        template={TemplateDashboard}
        isPrivate
      />

      <RouteWrapper
        path="/dashboard/seguranca/fazenda"
        exact
        component={Farm}
        template={TemplateDashboard}
        isPrivate
      />
      {/* --- Recursos Humanos --- */}
      <RouteWrapper
        path="/dashboard/recursos-humanos/funcionarios"
        exact
        component={Employees}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/recursos-humanos/horas-extras"
        exact
        component={Overtime}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/recursos-humanos/agendar-ferias"
        exact
        component={ScheduleHolidays}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/recursos-humanos/lancar-producao"
        exact
        component={LaunchProduction}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/recursos-humanos/equipes"
        exact
        component={Team}
        template={TemplateDashboard}
        isPrivate
      />
      <RouteWrapper
        path="/dashboard/recursos-humanos/cargos-funcoes"
        exact
        component={PositionsFunctions}
        template={TemplateDashboard}
        isPrivate
      />

      <RouteWrapper component={NotFound} template={TemplateCommun} />
    </Switch>
  );
}
