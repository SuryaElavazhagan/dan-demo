import React, { Component } from 'react';
// It is an unstable module, don't use in production use cases
import {unstable_scheduleCallback as defer} from 'scheduler';
import './App.css';
import DebouncedInput from './DebouncedInput';
import renderPlotChart from './plotChart';
import renderLineChart from './lineChart';
import renderAreaChart from './areaChart';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      inputText: '',
      options: ['Synchronous', 'Debounced', 'Asynchronous'],
      selectedOption: 'Synchronous'
    }

    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  handleTextChange(event){
    this.setState({
      inputText: event.target.value
    })
  }

  /**
   * 
   * @param {string} option used to specify selected option Synchronous|Debounced|Asynchronous
   */
  handleOptionsChange(option){
    this.setState({
      selectedOption: option
    })
  }

  componentDidMount(){
    window.addEventListener("resize",this.renderCharts);
    this.renderCharts();
  }

  /**
   * Renders
   * Simple (x,y) chart to the left
   * Line chart to right
   * Area chart to bottom
   */
  renderCharts(){
    renderPlotChart("leftChart", this.state.inputText);
    renderLineChart("rightChart", this.state.inputText);
    renderAreaChart("bottomChart", this.state.inputText);
  }

  componentDidUpdate(_, prevState){
    if(prevState.inputText !== this.state.inputText){
      // If the option is asynchronous, make rendering asynchronous.
      if(this.state.selectedOption === "Asynchronous")
        defer(this.renderCharts);
      else
        this.renderCharts();
    }
  }
  

  render() {
    return (
      <div className="container">
        <div className="options">
          {
            this.state.options.map(option => {
              return (
                <span key={option}>
                  <input type="radio"
                        id={option.toLowerCase()}
                        value={option}
                        checked={this.state.selectedOption === option}
                        onChange={() => this.handleOptionsChange(option)}
                  />
                  <label htmlFor={option.toLowerCase()} onClick={() => this.handleOptionsChange(option)}>{option}</label>
                </span>
              )
            })
          }
        </div>
        <div className="text-field">
        {
          this.state.selectedOption === "Debounced" ? (
            <DebouncedInput 
                placeholder="Your text here"
                initialData={this.state.inputText} 
                onChange={(inputText) => this.setState({ inputText })}/>
          ):(
            <input type="text" 
            placeholder="Your text here"
            value={this.state.inputText}
            onChange={this.handleTextChange} />
          )
        }
        </div>
        <div className="charts">
        
          <div className="charts-top">

            <div className="charts-top-left" id="leftChart"></div>
            <div className="charts-top-right" id="rightChart"></div>

          </div>
          
          <div className="charts-bottom" id="bottomChart"></div>

        </div>
      </div>
    );
  }
}

export default App;
