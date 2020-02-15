import React from 'react';

import {
  Page,
  Panel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  Switch,
  Breadcrumbs,
} from 'react-blur-admin';
import { Link } from 'react-router';
import { Row, Col } from 'react-flex-proto';
//const config = require('dotenv').config();
export class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
      apps: [
        { name: 'Service Now', url: 'https://ttechuat.service-now.com/ep', isEnabled: false },
        { name: 'MyHRStory', url: 'https://hcm2preview.sapsf.eu/sf/login', isEnabled: true },
        { name: 'T-Gini', url: 'https://hcm2preview.sapsf.eu/sf/login', isEnabled: true },
      ],
    };
  }


  componentDidMount() {
    const fetchData = async () => {
      try {
        const result = await fetch(`${process.env.API_BASE_URL}/apps`);
        const body = await result.json();
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({apps: body});
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchData();
  }

  async onSwitchChange(index) { 
    let switches = this.state.switches;
    switches[index] = !switches[index];

    let apps = this.state.apps;
    let app = apps[index];
    app.isEnabled = !app.isEnabled;
    apps[index] = app;
    this.setState({apps: apps});

    try {
      const result = await fetch(`${process.env.API_BASE_URL}/updateAppVisibilty`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({name: app.name, isEnable: app.isEnabled}),
      });
    }
    // eslint-disable-next-line brace-style
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Apps
      </Breadcrumbs>
    );
  }
  renderTableData() {
    return this.state.apps.map((app, index) => {
      const { name, url, isEnabled } = app;
      return (
        <TableRow  key={index}>
          <td>{name}</td>
          <td>{url}</td>
          <td>
            <Switch
              type="success"

              isOn={isEnabled}
              onChange={e => this.onSwitchChange(index)}
            />
          </td>
        </TableRow>
      );
    });
  }
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <Panel title="Onboard Web Apps">
          <Row>
            <Col>
              These are web apps that will open within a Web View in ONETemasek
              app.
            </Col>
            <Col align="right">
              <Link to="/apps-add">
                <Button title="Add New App" type="add" />
              </Link>
            </Col>
          </Row>
          <Table hover={false} border={true}>
            <TableHead blackMutedBackground={true}>
              <th>Apps</th>
              <th>URL</th>
              <th>Status</th>
            </TableHead>
            <TableBody>
            {this.renderTableData()}
            </TableBody>
          </Table>
        </Panel>
      </Page>
    );
  }
}
