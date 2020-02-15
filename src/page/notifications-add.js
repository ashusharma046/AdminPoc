import React from 'react';

import { Page, Panel, Select, Textarea, Button, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';

export class NotificationsAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onTextChange(key, event) {
    this.setState({ [key]: event.currentTarget.value });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
        <Link to='/notifications'>
          Notifications
        </Link>
          Add
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <Panel title='Add New Notification'>
          <Textarea
            label='Message'
            placeholder='Enter the message that you like to send to all ONETemasek users.'
            onChange={e => this.onTextChange('maintenance', e)}
            value={this.state.maintenance} />
          <Select
            placeholder='Select Recipients'
            isSearchable={true}
            options={[
              { value: 1, label: 'Mailing Group 1' },
              { value: 2, label: 'Mailing Group 2' },
              { value: 3, label: 'Mailing Group 3' },
              { value: 4, label: 'Mailing Group 4' },
              { value: 5, label: 'Mailing Group 5' },
              { value: 6, label: 'Mailing Group 6' },
            ]}
            onChange={value => this.setState({ selectTwo: value })}
            value={this.state.selectTwo} />
          <Link to='/notifications'>
            <Button title="Submit Entry" type='add' />
          </Link>
        </Panel>
      </Page>
    );
  }
}