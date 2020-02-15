import React from 'react';

import { Page, Panel, Table, TableHead, TableBody, TableRow, Switch, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';
import {Row, Col} from 'react-flex-proto';

export class QuickTasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     // switches: _.fill(Array(5), true),
      shortcuts: [
        { name: 'Apply Annual Leave', apiprovider: 'SuccessFactors', isenabled: false },
        { name: 'Apply Medical Leave', apiprovider: 'SuccessFactors', isenabled: true },
        { name: 'Book Meeting Room', apiprovider: 'Condeco', isenabled: true },
      ],
    };
  }

  async onSwitchChange(index) { 
    

    let shortcuts = this.state.shortcuts;
    let shortcut = shortcuts[index];
    shortcut.isenabled = !shortcut.isenabled;
    shortcuts[index] = shortcut;
    this.setState({shortcuts: shortcuts});

    try {
      const result = await fetch(`${process.env.API_BASE_URL}/updateShortCutsVisibilty`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: shortcut.name, isEnable: shortcut.isenabled}),
      });
    }
    // eslint-disable-next-line brace-style
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  componentDidMount() {
    const fetchData = async () => {
      try {
        const result = await fetch(`${process.env.API_BASE_URL}/getShortCuts`);
        const body = await result.json();
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({shortcuts: body});
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchData();
  }

  renderTableData() {
    return this.state.shortcuts.map((shortcut, index) => {
      const { name, apiprovider, isenabled } = shortcut;
      return (
        <TableRow  key={index}>
        <td>{name}</td>
        <td>{apiprovider}</td>
        <td>
          <Switch
            type="success"

            isOn={isenabled}
            onChange={e => this.onSwitchChange(index)}
          />
        </td>
      </TableRow>
      );
    });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Quick Tasks
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <Panel title='Quick Tasks'>
          <Row>
            <Col>
            These are web apps that will open within a Web View in ONETemasek app.
            </Col>
          </Row>
          <Table hover={false} border={true}>
            <TableHead blackMutedBackground={true}>
              <th>Description</th>
              <th>API Provider</th>
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
