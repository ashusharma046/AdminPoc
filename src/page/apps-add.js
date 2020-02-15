/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
import React from 'react';

import { Page, Panel, Input, Button, Breadcrumbs} from 'react-blur-admin';
import { Link } from 'react-router';


const withErrorHandling = WrappedComponent => ({ showError,errorMessage, children }) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">{errorMessage}</div>}
      {children}
    </WrappedComponent>
  );
};
const DivWithErrorHandling = withErrorHandling(({children}) => <div>{children}</div>);
// eslint-disable-next-line react/no-multi-comp
export class AppsAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      images: [],
      selectedFile: '',
      errorMessage: '',
      showError: false,
    };
  }


  onTextChange(key, event) {
    this.setState({ [key]: event.currentTarget.value });
  }

  fileSelectedHandler = event =>{
    console.log('on change handler');
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],

    });
  }
  addData = async () => {
    if (this.state.appname === '' || this.state.appname === undefined ) {
      this.setState({ showError: true, errorMessage: 'Please fill the App Name'});
      return;
    }
    if (this.state.appurl === '' || this.state.appurl === undefined) {
      this.setState({ showError: true, errorMessage: 'Please fill the App URL'});
      return;
    }
    this.setState({ showError: false, errorMessage: ''});

    try {
      const result = await fetch(`${process.env.API_BASE_URL}/createApp`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: this.state.appname, url: this.state.appurl}),
      });
    }
    // eslint-disable-next-line brace-style
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    const data = new FormData();
    data.append('file', this.state.selectedFile);
    fetch(`${process.env.API_BASE_URL}/${this.state.appname}`, {
      method: 'POST',
      body: data,
    })
    .then(res => res.json())
    .then(images => {
      this.setState({
        uploading: false,
        images,
      });
    });
    window.location.href = '/apps';
  };


  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
        <Link to='/apps'>
          Apps
        </Link>
          Add
      </Breadcrumbs>
    );
  }


  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()}>
        <DivWithErrorHandling showError={this.state.showError} errorMessage={this.state.errorMessage}>
        <Panel title='Add New Web App'>
              <Input
                label='App Name'
                placeholder='e.g. MyHRStory, ServiceNow'
                onChange={e => this.onTextChange('appname', e)}
                value={this.state.appname} />
              <Input
                label='URL'
                placeholder='e.g. https://ttechuat.service-now.com/ep'
                onChange={e => this.onTextChange('appurl', e)}
                value={this.state.appurl} />
              <Input
                type="file"
                onValidate={e => true}
                label='Upload Icon'
                addonRight={<i className='fa fa-upload' />}
                value = {this.state.selectedFile}
                onChange= {this.fileSelectedHandler}
               />
              <Button title="Submit Entry" type='add' onClick=
                {this.addData}
                />
            </Panel>
            </DivWithErrorHandling>
      </Page>
    );  }
}
