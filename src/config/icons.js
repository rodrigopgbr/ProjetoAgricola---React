import React from 'react';
import {
  Home,
  Label,
  Person,
  AttachMoney,
  PeopleAlt,
  Settings,
  Store,
  Timeline,
} from '@material-ui/icons';

export const icons = [
  {
    name: 'Default',
    icon: Label,
  },
  {
    name: 'Home',
    icon: Home,
  },
  {
    name: 'Person',
    icon: Person,
  },
  {
    name: 'AttachMoney',
    icon: AttachMoney,
  },
  {
    name: 'PeopleAlt',
    icon: PeopleAlt,
  },
  {
    name: 'Settings',
    icon: Settings,
  },
  {
    name: 'Store',
    icon: Store,
  },
  {
    name: 'Timeline',
    icon: Timeline,
  },
];

export function getItecon(name) {
  if (name) {
    const itenIcon = icons.find(i => i.name === name);
    if (itenIcon) {
      const ElementIcon = itenIcon.icon;
      return <ElementIcon />;
    }
    return <Label />;
  }
  return <Label />;
}
