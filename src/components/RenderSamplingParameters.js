import React from 'react';
import { Card, Button } from 'antd';
import RenderSwabSamplingFields from './RenderSwabSamplingFields';
import RenderRinseSamplingFields from './RenderRinseSamplingFields';

class RenderSamplingParameters extends React.Component {
  state = {
    swapSamplingSelected: false,
    rinseSamplingSelected: false
  };

  onSwapSamplingClick = () => {
    if (this.state.swapSamplingSelected) {
      this.setState({ swapSamplingSelected: false });
    } else {
      this.setState({ swapSamplingSelected: true });
    }
    this.props.isSwabConfigured();

  };

  onRinseSamplingClick = () => {
    if (this.state.rinseSamplingSelected) {
      this.setState({ rinseSamplingSelected: false });
    } else {
      this.setState({ rinseSamplingSelected: true });
    }
    this.props.isRinseConfigured();
  };

  renderSwabFields = () => {
    if (this.state.swapSamplingSelected) {
      return (
        <Card style={{ marginBottom: '1em' }}>
          <RenderSwabSamplingFields
            targetResidueType={this.props.targetResidueType}
            form={this.props.form}
          />
        </Card>
      );
    }
  };

  renderRinseFields = () => {
    if (this.state.rinseSamplingSelected) {
      return (
        <Card style={{ marginBottom: '1em' }}>
          <RenderRinseSamplingFields
            targetResidueType={this.props.targetResidueType}
            form={this.props.form}
            selected={this.state.rinseSamplingSelected}
          />
        </Card>
      );
    }
  };

  render() {
    if (this.props.resetForm) {
      this.setState({
        swapSamplingSelected: false,
        rinseSamplingSelected: false
      });
    }
    return (
      <div>
        <Button type={this.state.swapSamplingSelected ? "danger" : "primary"} ghost
          style={{ width: '100%', marginBottom: '1em' }}
          onClick={() => this.onSwapSamplingClick()}
        >
          {this.state.swapSamplingSelected ? "Remove Swap Sampling Parameters" : "Configure Swap Sampling Parameters"}
        </Button>
        {this.renderSwabFields()}
        <Button type={this.state.rinseSamplingSelected ? "danger" : "primary"} ghost
          style={{ width: '100%', marginBottom: '1em' }}
          onClick={() => this.onRinseSamplingClick()}
        >
          {this.state.rinseSamplingSelected ? "Remove Rinse Sampling Parameters" : "Configure Rinse Sampling Parameters"}
        </Button>
        {this.renderRinseFields()}
      </div>
    );
  };
}

export default RenderSamplingParameters;