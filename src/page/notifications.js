import React from 'react';

import { Page, Panel, Table, TableHead, TableBody, TableRow, Button, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';
import {Row, Col} from 'react-flex-proto';

export class Notifications extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Notifications
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <Panel title='Broadcast Mobile Notifications'>
          <Row>
            <Col>
            Send mobile notifications to users with ONETemasek installed.
            </Col>
            <Col align="right">
              <Link to='/notifications-add'>
                <Button title='Add New Notification' type='add' />
              </Link>
            </Col>
          </Row>
          <Table hover={false} border={true}>
            <TableHead blackMutedBackground={true}>
              <th>Message</th>
              <th>Date Sent</th>
            </TableHead>
            <TableBody>
              <TableRow>
                <td>Hello everyone, you are reminded to attend LoHei on 7 Feb 2020.</td>
                <td>30 Jan 2020</td>
              </TableRow>
            </TableBody>
          </Table>
        </Panel>
      </Page>
    );
  }
}