import React from 'react';

import { Page, Panel, Textarea, Switch, Breadcrumbs } from 'react-blur-admin';
import { Link } from 'react-router';

export class Maintenance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: _.fill(Array(5), true),
    };
  }

  onTextChange(key, event) {
    this.setState({ [key]: event.currentTarget.value });
  }

  onSwitchChange(index) {
    let switches = this.state.switches;
    switches[index] = !switches[index];
    this.setState({ switches });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Maintenance
      </Breadcrumbs>
    );
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <Panel title='Maintenance Management'>
          <Textarea
            label='Message'
            placeholder='Enter the message that you like users to see when they opened ONETemasek while its in maintenance mode.'
            onChange={e => this.onTextChange('maintenance', e)}
            value={this.state.maintenance} />
          <Switch type='success' isOn={this.state.switches[0]} onChange={e => this.onSwitchChange(0)}/>
        </Panel>
      </Page>
    );
  }
}