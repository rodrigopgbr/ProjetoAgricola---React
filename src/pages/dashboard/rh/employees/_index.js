import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ContentPage from '../../../../components/ContentPage';
import TabPanel from '../../../../components/tabPanel';
import { TabContainer } from './styles';

// paginas das abas
import Datas from './tabPages/datas/_index';
import Contacts from './tabPages/contacts/_index';
import Positions from './tabPages/positions/_index';
import Documents from './tabPages/documents/_index';
import AdditionalInformation from './tabPages/additionalInformation/_index';

export default function Employees() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ContentPage title="Funcionarios">
      <TabContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          className="tabs-employeed"
        >
          <Tab label="Dados" id="tabpanel-0" />
          <Tab label="Contato" iid="tabpanel-1" />
          <Tab label="Cargo" id="tabpanel-2" />
          <Tab label="Informações adicionais" id="tabpanel-3" />
          <Tab label="Documentos" id="tabpanel-4" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Datas />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Contacts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Positions />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdditionalInformation />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Documents />
        </TabPanel>
      </TabContainer>
    </ContentPage>
  );
}
