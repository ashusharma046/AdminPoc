import React from 'react';
import { Page, Panel, Button } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';
import { Link } from 'react-router';

export class Welcome extends React.Component {

  render() {
    return (
      <Page title="Dashboard">
        <Row>
        <Col padding={5}>
            <Panel title='Apps'>
              Show some stats
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Maintenance'>
            Show some stats
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Notifications'>
            Show some stats
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Quick Tasks'>
            Show some stats
            </Panel>
          </Col>
        </Row>

        <h4>External Management Systems</h4>
        <Row>
          <Col padding={5}>
            <Panel title='News and Announcments'>
              <p>Show some stats</p>
              <Link to='/'>
                <Button type='add' icon={<i className='fa fa-chevron-circle-right' />} title="Go to Contentful" />
              </Link>
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title='Metrics and Monitoring'>
            <p>Show some stats</p>
              <Link to='/'>
                <Button type='add' icon={<i className='fa fa-chevron-circle-right' />} title="Go to Amplitude" />
              </Link>
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}

